export async function loadFileFromDisc() {
  try {
    // Открываем диалог выбора файла
    const [fileHandle] = await (window as any).showOpenFilePicker();

    // Получаем файл
    const file = await fileHandle.getFile();

    // Читаем содержимое файла
    const text = await file.text();

    // Выводим содержимое файла в консоль
    return text;
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
  }
}
