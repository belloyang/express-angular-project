export interface HarvestBoundary {
    time_microsecs: number;
    sequence_number?: number;
}
export interface HarvestParams {
    range: {
        lower: HarvestBoundary;
        upper: HarvestBoundary;
    };
    output_path: string;
    output_pattern: string;
    hours_per_file: number;
    userInfo?: {
        uid: number;
        gid: number;
    };
}