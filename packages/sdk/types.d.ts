interface CategoriesItem {
    id: number;
    name: string;
}

interface StatItem {
    player_uuid: string;
    stat_categories_id: number;
    stat_name: string;
    value: number;
}

interface PlayersItem {
    player_uuid: string;
    name: string;
}

export interface PlayerStats {
    player_uuid: string;
    stats: StatItem[];
}

export interface CategoryStats {
    category: CategoriesItem
    stats: StatItem[]
}

export type Categories = CategoriesItem[];
export type Players = PlayersItem[];
