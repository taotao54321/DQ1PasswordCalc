// bool 値入力コンポーネント。

import React from "react";

type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    id: string;
};

export const InputBool: React.VFC<Props> = ({ value, onChange, id }) => {
    const onChangeInner = (ev: React.ChangeEvent<HTMLInputElement>) => {
        onChange(ev.target.checked);
    };

    return (
        <input
            id={id}
            type="checkbox"
            checked={value}
            onChange={onChangeInner}
        />
    );
};
