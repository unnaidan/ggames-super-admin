import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, CircularProgress, Image } from '@nextui-org/react';
import { useUpload } from '@src/hooks/useUpload';
import { absolutePath } from '@src/lib/utils';
import { default as mime } from 'mime';

type DropZoneProps = {
    url: string;
    error?: boolean;
    title?: string;
    description?: string;
    value?: string | null;
    onChange: (value: any) => void;
};

export const DropZone = (props: DropZoneProps): JSX.Element => {
    const {
        error = false,
        title = 'Зураг',
        description = 'Энд дарж хуулах файлаа сонгоно уу',
        url,
        value,
        onChange,
    } = props;

    const [
        upload,
        uploadResult
    ] = useUpload({
        url,
        onError: err => {
            //
        }
    });

    if (value) {
        return (
            <div>
                <div className="border-dashed border-2 border-default-300 rounded-lg bg-default-50">
                    <div className="p-1 flex">
                        {mime.getType(value)?.toString().startsWith('image')
                            ?
                            <div className="relative rounded bg-default-100">
                                <Image
                                    radius="sm"
                                    src={absolutePath(value)}
                                    style={{
                                        maxHeight: 144
                                    }}
                                />
                                <Button
                                    size="sm"
                                    color="danger"
                                    radius="full"
                                    className="absolute -top-2 -right-2 z-10"
                                    isIconOnly
                                    onPress={() => {
                                        onChange(null);
                                    }}
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </Button>
                            </div>
                            :
                            <div className="relative h-36 flex-1 flex items-center justify-center border rounded bg-default-100">
                                <div className="text-xl uppercase font-bold text-foreground-500">
                                    {mime.getExtension(mime.getType(value) ?? '')}
                                </div>
                                <Button
                                    size="sm"
                                    color="danger"
                                    radius="full"
                                    className="absolute -top-2 -right-2 z-10"
                                    isIconOnly
                                    onPress={() => {
                                        onChange(null);
                                    }}
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <label>
            <div className="border-dashed border-2 border-default-300 rounded-lg cursor-pointer bg-default-50 hover:bg-default-100">
                <input
                    type="file"
                    disabled={uploadResult.uploading}
                    style={{
                        display: 'none'
                    }}
                    onChange={async e => {
                        if (e.target.files === null) {
                            return;
                        }
                        const value = await upload(e.target.files[0]);
                        e.target.value = '';
                        onChange(value);
                    }}
                />
                <div className="p-8 flex flex-col items-center">
                    {uploadResult.uploading
                        ?
                        <CircularProgress
                            size="md"
                            color="primary"
                            value={uploadResult.progress}
                        />
                        :
                        <CloudArrowUpIcon className="w-10 h-10 text-foreground-300" />
                    }
                    <div className="mt-2 text-sm text-foreground-500 font-bold">
                        {title}
                    </div>
                    <div className="text-sm text-foreground-500">
                        {description}
                    </div>
                </div>
            </div>
        </label>
    );
};
