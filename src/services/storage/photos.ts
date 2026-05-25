export type JobPhotoUpload = {
  jobId: string;
  kind: 'before' | 'after' | 'attachment';
  file: File;
};

export async function prepareJobPhotoUpload(upload: JobPhotoUpload) {
  return {
    storageReady: false,
    bucket: 'job-photos',
    path: `${upload.jobId}/${upload.kind}/${upload.file.name}`,
    compressionPending: true
  };
}
