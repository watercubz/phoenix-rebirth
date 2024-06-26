import { useState } from "react";
import { useAsyncFn } from "react-use";
import { useFileSystem } from "../use-file-system";
import KanvasCore, { UPLOAD_INTERFACE } from "@kanvas/core";
import { useSystemModule } from "../use-system-module";
import { useClientContext } from "../../store/core.store/client.store";

export interface UPLOAD_FILES_INTERFACE {
  entityUUID: string;
  systemModuleSlug: string;
  files: File | File[];
}
export function useFilesUpload(customSDK?: KanvasCore) {
  const { sdk } = useClientContext();
  const {
    operations: { getSystemModuleBySlug },
  } = useSystemModule({ sdk: customSDK ?? sdk });

  const [filesUploaded, setFilesUploaded] = useState<UPLOAD_INTERFACE[]>([]);
  const {
    operations: { uploadFile, attachFile },
  } = useFileSystem({ sdk: customSDK ?? sdk });

  const [state, execute] = useAsyncFn(
    async ({ entityUUID, systemModuleSlug, files }: UPLOAD_FILES_INTERFACE) => {
      try {
        const filesArray = Array.isArray(files) ? files : [files];
        const uploadPromises = filesArray
          .filter((file): file is File => file !== undefined)
          .map((file) => uploadFile({ data: file }));
        const uploaded = await Promise.all(uploadPromises);
        const systemModule = await getSystemModuleBySlug(systemModuleSlug);
        const systemModuleUuid = systemModule[0]?.uuid ?? "";
        const attachPromises = uploaded.map((file) =>
          attachFile({
            fileSystemUUID: file.uuid,
            entityUUID,
            fieldName: "filesystem.field_name",
            systemModuleUUID: systemModuleUuid,
          })
        );
        await Promise.all(attachPromises);

        setFilesUploaded(uploaded);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [],
  );

  return {
    models: {
      filesUploaded,
      filesUploading: state.loading,
      filesUploadingError: state.error,
    },
    operations: { uploadFiles: execute },
  };
}
