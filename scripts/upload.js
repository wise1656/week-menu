import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from 'fs';
import * as path from 'path';
import mime from 'mime';
import yandexConfig from './config.js';


// Конфигурация клиента S3 для Яндекс.Облака
const s3Client = new S3Client({
    endpoint: 'https://storage.yandexcloud.net',
    region: 'ru-central1', // Регион вашего бакета
    credentials: {
        accessKeyId: yandexConfig.accessKeyId, // Ваш Access Key ID
        secretAccessKey: yandexConfig.secretAccessKey, // Ваш Secret Access Key
    },
});

// Функция для загрузки всех файлов из папки в бакет
async function uploadFilesFromDirectory(directoryPath, bucketName) {
    const files = fs.readdirSync(directoryPath); // Получаем список файлов в директории

    for (const file of files) {
        const filePath = path.join(directoryPath, file); // Полный путь к файлу

        if (fs.statSync(filePath).isFile()) { // Проверяем, является ли это файлом
            const fileStream = fs.createReadStream(filePath); // Создаем поток чтения файла

            const contentType = mime.getType(filePath) || 'application/octet-stream';
            const uploadParams = {
                Bucket: bucketName,
                Key: file, // Имя файла в бакете
                Body: fileStream,
                ContentType: contentType,
            };

            try {
                const data = await s3Client.send(new PutObjectCommand(uploadParams));
                console.log(`Файл ${file} успешно загружен.`, data);
            } catch (error) {
                console.error(`Ошибка при загрузке файла ${file}:`, error.message);
            }
        }
    }
}


uploadFilesFromDirectory('./dist', 'week-menu')
