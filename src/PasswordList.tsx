// パターンにマッチする復活の呪文を表示するコンポーネント。

import React from "react";

import * as util from "./util";

import "./style.css";

type Props = {
    countMax: number;
    onChangeCountMax: (countMax: number) => void;
    passwords: readonly string[];
    onClickPassword: (password: string) => void;
};

export const PasswordList: React.VFC<Props> = ({
    countMax,
    onChangeCountMax,
    passwords,
    onClickPassword,
}) => {
    return (
        <div className="PasswordList">
            <div>
                最大表示個数: {count_max_select(countMax, onChangeCountMax)}
            </div>
            {passwords_list(passwords, onClickPassword)}
        </div>
    );
};

const count_max_select = (value: number, onChange: (n: number) => void) => {
    const VALUES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    const onChangeInner = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = util.myParseInt(ev.target.value);

        // パースできない入力は無視する。
        if (value === undefined) return;

        onChange(value);
    };

    return (
        <select value={value} onChange={onChangeInner}>
            {VALUES.map((n) => (
                <option key={n} value={n}>
                    {n}
                </option>
            ))}
        </select>
    );
};

const passwords_list = (
    passwords: readonly string[],
    onClick: (password: string) => void
) => {
    const items = passwords.map((password) => {
        return (
            <li key={password}>
                <span
                    className="PasswordList-listItem"
                    onClick={() => {
                        onClick(password);
                    }}
                >
                    {password}
                </span>
            </li>
        );
    });

    return <ul>{items}</ul>;
};
