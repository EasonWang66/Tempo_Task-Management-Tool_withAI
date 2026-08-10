use serde_json::{json, Value};

#[tauri::command]
async fn ai_breakdown(
    provider: String,
    api_key: String,
    prompt: String,
) -> Result<String, String> {
    let client = reqwest::Client::new();
    let response = if provider == "openai" {
        client
            .post("https://api.openai.com/v1/chat/completions")
            .bearer_auth(&api_key)
            .json(&json!({
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"}
            }))
            .send()
            .await
    } else if provider == "anthropic" {
        client
            .post("https://api.anthropic.com/v1/messages")
            .header("x-api-key", &api_key)
            .header("anthropic-version", "2023-06-01")
            .json(&json!({
                "model": "claude-3-5-haiku-latest",
                "max_tokens": 700,
                "messages": [{"role": "user", "content": prompt}]
            }))
            .send()
            .await
    } else {
        return Err("Unsupported AI provider".into());
    }
    .map_err(|error| format!("Could not connect to the AI provider: {error}"))?;

    let status = response.status();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Could not read the provider response: {error}"))?;

    if !status.is_success() {
        let detail = serde_json::from_str::<Value>(&body)
            .ok()
            .and_then(|value| value.pointer("/error/message").and_then(Value::as_str).map(str::to_owned))
            .unwrap_or_else(|| format!("Provider returned HTTP {status}"));
        return Err(match status.as_u16() {
            401 => format!("The API key was rejected: {detail}"),
            429 => format!("The account has no available quota or is rate-limited: {detail}"),
            _ => detail,
        });
    }

    let value: Value = serde_json::from_str(&body)
        .map_err(|_| "The provider returned an unreadable response".to_string())?;
    let content = if provider == "openai" {
        value.pointer("/choices/0/message/content")
    } else {
        value.pointer("/content/0/text")
    }
    .and_then(Value::as_str)
    .ok_or_else(|| "The provider response did not contain a milestone plan".to_string())?;

    Ok(content.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ai_breakdown])
        .run(tauri::generate_context!())
        .expect("error while running Tempo");
}
