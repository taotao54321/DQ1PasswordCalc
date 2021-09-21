// 復活の呪文パターン入力コンポーネント。
//
// 入力は特に制限しないので、親コンポーネント側で validation が必要。
//
// 文字数制限を超える入力や無効な文字は最初から弾けるのが理想だが、実装が困難な
// ので妥協した(Linux の fcitx 環境では React の onChange イベントが未確定の日
// 本語入力に対しても発火する)。
// 同様の理由でリアルタイムでのエラー表示も行わない。

import React from "react";

import { PASSWORD_LEN_MAX, pattern_char_count } from "./dq1";

import "./style.css";

type Props = {
    pattern: string;
    onChange: (pattern: string) => void;
    onSubmit: () => void;
    lastError: string;
};

export const PatternForm: React.VFC<Props> = ({
    pattern,
    onChange,
    onSubmit,
    lastError,
}) => {
    const onSubmitInner = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onSubmit();
    };

    const char_count = pattern_char_count(pattern);

    return (
        <form onSubmit={onSubmitInner}>
            <div className="PatternForm">
                <div>
                    <input
                        className="PatternForm-pattern"
                        type="text"
                        placeholder="復活の呪文パターン ('?' で任意の 1 文字にマッチ)"
                        value={pattern}
                        onChange={(ev) => {
                            onChange(ev.target.value);
                        }}
                    />
                    <span
                        className={`PatternForm-charCount ${
                            char_count > PASSWORD_LEN_MAX
                                ? "PatternForm-error"
                                : ""
                        }`}
                    >
                        {char_count} / {PASSWORD_LEN_MAX}
                    </span>
                </div>
                <div className="PatternForm-buttons">
                    <button type="submit">Search</button>
                </div>
                <div className="PatternForm-error">{lastError}</div>
            </div>
        </form>
    );
};
