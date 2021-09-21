use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn decode(password: &str) -> Result<JsValue, JsValue> {
    dq1_password::decode(password)
        .map_err(|e| e.to_string().into())
        .and_then(|game_state| JsValue::from_serde(&game_state).map_err(|e| e.to_string().into()))
}

#[wasm_bindgen]
pub fn encode(game_state: JsValue) -> Result<String, JsValue> {
    let game_state = game_state
        .into_serde()
        .map_err(|e| JsValue::from(e.to_string()))?;

    dq1_password::encode(&game_state).map_err(|e| e.to_string().into())
}

#[wasm_bindgen]
pub fn generate(pattern: &str, n_max: usize) -> Result<Box<[JsValue]>, JsValue> {
    dq1_password::generate(pattern, n_max)
        .map(|passwords| {
            passwords
                .into_iter()
                .map(JsValue::from)
                .collect::<Vec<_>>()
                .into_boxed_slice()
        })
        .map_err(|e| e.to_string().into())
}

#[wasm_bindgen]
pub fn validate_hero_name(hero_name: &str) -> Result<(), JsValue> {
    dq1_password::validate_hero_name(hero_name).map_err(|e| e.to_string().into())
}

#[wasm_bindgen]
pub fn validate_pattern(pattern: &str) -> Result<(), JsValue> {
    dq1_password::validate_pattern(pattern).map_err(|e| e.to_string().into())
}
