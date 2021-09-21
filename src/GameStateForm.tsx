// 復活の呪文に対応するゲーム状態を表示/入力するコンポーネント。

import React from "react";

import {
    ARMOR_NAMES,
    GameState,
    HERO_NAME_LEN_MAX,
    SHIELD_NAMES,
    TOOL_NAMES,
    WEAPON_NAMES,
} from "./dq1";

import { InputArrayIndex } from "./InputArrayIndex";
import { InputBool } from "./InputBool";
import { InputInt } from "./InputInt";

import "./style.css";

type Props = {
    gameState: GameState;
    onChange: (gameState: GameState) => void;
    onSubmit: () => void;
    lastError: string;
};

export const GameStateForm: React.VFC<Props> = ({
    gameState,
    onChange,
    onSubmit,
    lastError,
}) => {
    const [incremental, setIncremental] = React.useState(false);
    const [submitRequest, setSubmitRequest] = React.useState(false);

    const onChangeWrapper = (gameState: GameState) => {
        onChange(gameState);

        // インクリメンタルエンコード時に変更が行われたら次回 onSubmit() を呼ぶ。
        // (ここで直ちに onSubmit() を呼ぶと、古い方の状態がエンコードされてしまう)
        if (incremental) {
            setSubmitRequest(true);
        }
    };

    const onSubmitInner = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onSubmit();
    };

    const input_inventory = [...gameState.inventory.entries()].map(
        ([i, tool]) => {
            return (
                <div key={i}>
                    <InputArrayIndex
                        labels={TOOL_NAMES}
                        value={tool}
                        onChange={(x) => {
                            const inventory = [...gameState.inventory];
                            inventory[i] = x;
                            onChangeWrapper({ ...gameState, inventory });
                        }}
                    />
                </div>
            );
        }
    );

    if (submitRequest) {
        onSubmit();
        setSubmitRequest(false);
    }

    return (
        <form onSubmit={onSubmitInner}>
            <div className="GameStateForm">
                <table>
                    <tbody>
                        <tr>
                            <td>名前</td>
                            <td>
                                <input
                                    className="GameStateForm-heroName"
                                    type="text"
                                    value={gameState.hero_name}
                                    onChange={(ev) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            hero_name: ev.target.value,
                                        });
                                    }}
                                />
                                <span
                                    className={`GameStateForm-heroName-charCount ${
                                        gameState.hero_name.length >
                                        HERO_NAME_LEN_MAX
                                            ? "GameStateForm-error"
                                            : ""
                                    }`}
                                >
                                    {gameState.hero_name.length} /{" "}
                                    {HERO_NAME_LEN_MAX}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>経験値</td>
                            <td>
                                <InputInt
                                    className="GameStateForm-heroXp"
                                    min={0}
                                    max={0xffff}
                                    value={gameState.hero_xp}
                                    onChange={(hero_xp) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            hero_xp,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>金</td>
                            <td>
                                <InputInt
                                    className="GameStateForm-purse"
                                    min={0}
                                    max={0xffff}
                                    value={gameState.purse}
                                    onChange={(purse) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            purse,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>武器</td>
                            <td>
                                <InputArrayIndex
                                    labels={WEAPON_NAMES}
                                    value={gameState.hero_weapon}
                                    onChange={(hero_weapon) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            hero_weapon,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>鎧</td>
                            <td>
                                <InputArrayIndex
                                    labels={ARMOR_NAMES}
                                    value={gameState.hero_armor}
                                    onChange={(hero_armor) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            hero_armor,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>盾</td>
                            <td>
                                <InputArrayIndex
                                    labels={SHIELD_NAMES}
                                    value={gameState.hero_shield}
                                    onChange={(hero_shield) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            hero_shield,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>薬草</td>
                            <td>
                                <InputInt
                                    className="GameStateForm-herbCount"
                                    min={0}
                                    max={6}
                                    value={gameState.herb_count}
                                    onChange={(herb_count) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            herb_count,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>鍵</td>
                            <td>
                                <InputInt
                                    className="GameStateForm-keyCount"
                                    min={0}
                                    max={6}
                                    value={gameState.key_count}
                                    onChange={(key_count) => {
                                        onChangeWrapper({
                                            ...gameState,
                                            key_count,
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="GameStateForm-labelTop">道具</td>
                            <td>{input_inventory}</td>
                        </tr>
                        <tr>
                            <td className="GameStateForm-labelTop">フラグ</td>
                            <td>
                                <div>
                                    <InputBool
                                        id="flag_equip_dragon_scale"
                                        value={
                                            gameState.flag_equip_dragon_scale
                                        }
                                        onChange={(flag_equip_dragon_scale) => {
                                            onChangeWrapper({
                                                ...gameState,
                                                flag_equip_dragon_scale,
                                            });
                                        }}
                                    />
                                    <label htmlFor="flag_equip_dragon_scale">
                                        りゅうのうろこ装備
                                    </label>
                                </div>
                                <div>
                                    <InputBool
                                        id="flag_equip_warrior_ring"
                                        value={
                                            gameState.flag_equip_warrior_ring
                                        }
                                        onChange={(flag_equip_warrior_ring) => {
                                            onChangeWrapper({
                                                ...gameState,
                                                flag_equip_warrior_ring,
                                            });
                                        }}
                                    />
                                    <label htmlFor="flag_equip_warrior_ring">
                                        せんしのゆびわ装備
                                    </label>
                                </div>
                                <div>
                                    <InputBool
                                        id="flag_got_death_necklace"
                                        value={
                                            gameState.flag_got_death_necklace
                                        }
                                        onChange={(flag_got_death_necklace) => {
                                            onChangeWrapper({
                                                ...gameState,
                                                flag_got_death_necklace,
                                            });
                                        }}
                                    />
                                    <label htmlFor="flag_got_death_necklace">
                                        しのくびかざり入手済
                                    </label>
                                </div>
                                <div>
                                    <InputBool
                                        id="flag_beated_golem"
                                        value={gameState.flag_beated_golem}
                                        onChange={(flag_beated_golem) => {
                                            onChangeWrapper({
                                                ...gameState,
                                                flag_beated_golem,
                                            });
                                        }}
                                    />
                                    <label htmlFor="flag_beated_golem">
                                        メルキド入口のゴーレム撃破済
                                    </label>
                                </div>
                                <div>
                                    <InputBool
                                        id="flag_beated_dragon"
                                        value={gameState.flag_beated_dragon}
                                        onChange={(flag_beated_dragon) => {
                                            onChangeWrapper({
                                                ...gameState,
                                                flag_beated_dragon,
                                            });
                                        }}
                                    />
                                    <label htmlFor="flag_beated_dragon">
                                        沼地の洞窟のドラゴン撃破済
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>salt</td>
                            <td>
                                <InputInt
                                    className="GameStateForm-salt"
                                    min={0}
                                    max={7}
                                    value={gameState.salt}
                                    onChange={(salt) => {
                                        onChangeWrapper({ ...gameState, salt });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="GameStateForm-buttons">
                                <input
                                    id="GameStateForm-incremental"
                                    type="checkbox"
                                    checked={incremental}
                                    onChange={(ev) => {
                                        setIncremental(ev.target.checked);
                                    }}
                                />
                                <label htmlFor="GameStateForm-incremental">
                                    incremental
                                </label>{" "}
                                <button type="submit">Encode</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="GameStateForm-error">{lastError}</div>
            </div>
        </form>
    );
};
