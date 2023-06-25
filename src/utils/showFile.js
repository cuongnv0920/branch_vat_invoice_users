export function showFile(path) {
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  const indexOfDash = fileName.indexOf("-");
  const formattedFileName = fileName.substring(indexOfDash + 1);
  const fileType = formattedFileName.substring(
    formattedFileName.lastIndexOf(".") + 1
  );

  return {
    fileName: formattedFileName,
    fileType: fileType,
  };
}
