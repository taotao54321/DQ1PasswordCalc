// 整数入力コンポーネント。
//
// min, max で範囲を指定する。範囲外の値は clamp される。

import React from "react";

import * as util from "./util";

type Props = {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
};

export const InputInt: React.VFC<Props> = ({
    min,
    max,
    value,
    onChange,
    className = "",
}) => {
    // <input type="number"> は挙動が怪しいため使わない(例: 数字以外を入力したとき空文字列に戻る)。

    const onChangeInner = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = parse(ev.target.value);

        // パースできない入力は無視する。
        if (value === undefined) return;

        onChange(clamp(value, min, max));
    };

    return (
        <input
            className={className}
            type="text"
            value={value}
            onChange={onChangeInner}
        />
    );
};

const parse = (s: string): number | undefined => {
    // 編集操作の都合上、空文字列に対しては 0 を返す。
    // これにより、"1" の状態から backspace キーを押すことで "0" に戻せる。
    if (s === "") return 0;

    return util.myParseInt(s);
};

const clamp = (x: number, min: number, max: number): number => {
    return Math.max(Math.min(x, max), min);
};
