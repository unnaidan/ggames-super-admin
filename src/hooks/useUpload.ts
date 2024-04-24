import { API } from '@src/plugins/axios';
import { useState } from 'react';

type UploadResult = {
    uploading: boolean;
    progress: number;
};

type UseUploadProps = {
    input?: string;
    url: string;
    onError?: (error: any) => void;
};

type UseUpload<P> = (props: P) => [
    (file: Blob) => Promise<string | null>,
    UploadResult
];

export const useUpload: UseUpload<UseUploadProps> = (props: UseUploadProps) => {
    API.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    const {
        input = 'file',
        url,
        onError
    } = props;

    const [
        uploading,
        setUploading
    ] = useState(false);
    const [
        progress,
        setProgress
    ] = useState(0);

    const uploadResult: UploadResult = {
        uploading,
        progress
    };

    const config = {
        onUploadProgress: ({ total, loaded }: any) => setProgress(Math.floor(loaded / total * 100))
    };

    const prepareData = (file: Blob) => {
        const data = new FormData();
        data.append(input, file);
        return data;
    };

    const upload = async (file: Blob | null): Promise<string | null> => {
        if (file === null) {
            return null;
        }
        try {
            setUploading(true);
            setProgress(0);
            return await API.post(url, prepareData(file), config);
        }
        catch (err: any) {
            if (onError && onError instanceof Function) {
                onError(err);
            }
            return null;
        }
        finally {
            setUploading(false);
        }
    };

    return [
        upload,
        uploadResult
    ];
};
