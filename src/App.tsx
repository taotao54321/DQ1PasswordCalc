import React from "react";

import {
    PASSWORD_LEN_MAX,
    decode_password,
    encode_password,
    gameStateDefault,
    generate_passwords,
} from "./dq1";

import { GameStateForm } from "./GameStateForm";
import { PasswordList } from "./PasswordList";
import { PatternForm } from "./PatternForm";

import "./style.css";

export const App: React.VFC = () => {
    // TODO: JSだとパターン検索が一瞬では終わらないので、waiting 表示が欲しい

    const [pattern, setPattern] = React.useState("");
    const [passwordCountMax, setPasswordCountMax] = React.useState(10);
    const [passwords, setPasswords] = React.useState<string[]>([]);
    const [gameState, setGameState] = React.useState(gameStateDefault());

    const [lastPatternError, setLastPatternError] = React.useState("");
    const [lastGameStateError, setLastGameStateError] = React.useState("");

    const onSubmitPattern = () => {
        // パターンから空白を除く。
        // また、文字数が足りなければ末尾に '?' を補う。
        const pattern_padded = pattern.replaceAll(/\s/g, "").padEnd(20, "?");

        // 文字数オーバーの場合、何もしない。
        // (このエラーは PatternForm 側で表示される)
        if (pattern_padded.length > PASSWORD_LEN_MAX) return;

        try {
            const passwords = generate_passwords(
                pattern_padded,
                passwordCountMax
            );
            setPasswords(passwords);
            setLastPatternError("");
        } catch (e) {
            setLastPatternError(e as string);
        }
    };

    const onClickPassword = (password: string) => {
        try {
            const gameState = decode_password(password);

            // 名前の末尾の空白を除く。
            gameState.hero_name = gameState.hero_name.trimEnd();

            setGameState(gameState);
        } catch (e) {
            // unexpected
            console.error(e);
        }
    };

    const onSubmitGameState = () => {
        try {
            const password = encode_password(gameState);
            setPattern(password);
            setLastGameStateError("");
        } catch (e) {
            setLastGameStateError(e as string);
        }
    };

    return (
        <div className="App">
            <div>
                <PatternForm
                    pattern={pattern}
                    onChange={(pattern: string) => {
                        setPattern(pattern);
                    }}
                    onSubmit={onSubmitPattern}
                    lastError={lastPatternError}
                />
                <PasswordList
                    countMax={passwordCountMax}
                    onChangeCountMax={(countMax) => {
                        setPasswordCountMax(countMax);
                    }}
                    passwords={passwords}
                    onClickPassword={onClickPassword}
                />
            </div>
            <div>
                <GameStateForm
                    gameState={gameState}
                    onChange={(gameState) => {
                        setGameState(gameState);
                    }}
                    onSubmit={onSubmitGameState}
                    lastError={lastGameStateError}
                />
            </div>
        </div>
    );
};
