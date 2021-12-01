
export interface HarvestProgress {
    progress: number;
    num_files: number;
    duration_ms: number; // default unit: ms
    num_elements_total: number;
    num_elements_processed: number;
    num_bytes_processed: number; // default unit:bytes
    speed: number; // Mib per sec
}
