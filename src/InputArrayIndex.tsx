// 配列内の要素を選択し、そのインデックスを返すコンポーネント。

import React from "react";

import * as util from "./util";

type Props = {
    labels: readonly string[];
    value: number;
    onChange: (value: number) => void;
};

export const InputArrayIndex: React.VFC<Props> = ({
    labels,
    value,
    onChange,
}) => {
    const onChangeInner = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = util.myParseInt(ev.target.value);

        // パースできない入力は無視する。
        if (value === undefined) return;

        // 範囲外のインデックスは無視する。
        if (value < 0 || labels.length <= value) return;

        onChange(value);
    };

    const options_jsx = [...labels.entries()].map(([idx, label]) => {
        return (
            <option key={idx} value={idx}>
                {label}
            </option>
        );
    });

    return (
        <select value={value} onChange={onChangeInner}>
            {options_jsx}
        </select>
    );
};
