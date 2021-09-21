import * as dq1_password from "dq1-password";

export const decode_password = (password: string): GameState => {
    // 型は正しいものと仮定する。
    return dq1_password.decode(password);
};

export const encode_password = (game_state: GameState): string => {
    return dq1_password.encode(game_state);
};

export const generate_passwords = (
    pattern: string,
    n_max: number
): string[] => {
    return dq1_password.generate(pattern, n_max);
};

export const validate_hero_name = (hero_name: string): void => {
    dq1_password.validate_hero_name(hero_name);
};

export const validate_pattern = (pattern: string): void => {
    dq1_password.validate_pattern(pattern);
};

export const hero_name_is_valid = (hero_name: string): boolean => {
    try {
        validate_hero_name(hero_name);
        return true;
    } catch (e) {
        return false;
    }
};

export const pattern_is_valid = (pattern: string): boolean => {
    try {
        validate_pattern(pattern);
        return true;
    } catch (e) {
        return false;
    }
};

export const pattern_char_count = (pattern: string): number => {
    return pattern.replaceAll(/\s/g, "").length;
};

export const PASSWORD_LEN_MAX = 20;

export const HERO_NAME_LEN_MAX = 4;

export const WEAPON_NAMES: readonly string[] = [
    "(なし)",
    "たけざお",
    "こんぼう",
    "どうのつるぎ",
    "てつのおの",
    "はがねのつるぎ",
    "ほのおのつるぎ",
    "ロトのつるぎ",
];

export const ARMOR_NAMES: readonly string[] = [
    "(なし)",
    "ぬののふく",
    "かわのふく",
    "くさりかたびら",
    "てつのよろい",
    "はがねのよろい",
    "まほうのよろい",
    "ロトのよろい",
];

export const SHIELD_NAMES: readonly string[] = [
    "(なし)",
    "かわのたて",
    "てつのたて",
    "みかがみのたて",
];

export const TOOL_NAMES: readonly string[] = [
    "(なし)",
    "たいまつ",
    "せいすい",
    "キメラのつばさ",
    "りゅうのうろこ",
    "ようせいのふえ",
    "せんしのゆびわ",
    "ロトのしるし",
    "おうじょのあい",
    "のろいのベルト",
    "ぎんのたてごと",
    "しのくびかざり",
    "たいようのいし",
    "あまぐものつえ",
    "にじのしずく",
];

export type GameState = {
    hero_name: string;
    hero_xp: number;
    purse: number;
    hero_weapon: number;
    hero_armor: number;
    hero_shield: number;
    herb_count: number;
    key_count: number;
    inventory: readonly number[];
    flag_equip_dragon_scale: boolean;
    flag_equip_warrior_ring: boolean;
    flag_got_death_necklace: boolean;
    flag_beated_golem: boolean;
    flag_beated_dragon: boolean;
    salt: number;
};

export const gameStateDefault = (): GameState => {
    return {
        hero_name: "",
        hero_xp: 0,
        purse: 0,
        hero_weapon: 0,
        hero_armor: 0,
        hero_shield: 0,
        herb_count: 0,
        key_count: 0,
        inventory: [0, 0, 0, 0, 0, 0, 0, 0],
        flag_equip_dragon_scale: false,
        flag_equip_warrior_ring: false,
        flag_got_death_necklace: false,
        flag_beated_golem: false,
        flag_beated_dragon: false,
        salt: 0,
    };
};
