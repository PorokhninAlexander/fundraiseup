# Fundraiseup test

## Настройка проекта
1. Установите необходимые npm пакеты: npm install
2. Создайте файл .env на основе файла .env.example и добавьте URI к MongoDB в файл.
## Запуск проекта
Проект можно запустить в трех режимах:

1. `npm run start:app`: Запускает приложение, которое генерирует данные покупателей и пачками каждые 200 мс вставляет их в базу.
2. `npm run start:sync`: Запускает приложение, которое слушает изменения в коллекции customers, анонимизирует их и пачками складывает в коллекцию customers_anonymised.
3. `npm run start:fullsync`: Запускает полную синхронизацию коллекций. Записи из коллекции customers извлекаются одна за другой, анонимизируются и сохраняются в коллекцию customers_anonymised.

## Особенности приложения
Для приложения `sync` важно не терять изменения, пока приложение перезапускается. Чтобы избежать периода "оффлайн", реализован "безшовный" перезапуск. Чтобы безопасно перезапустить приложение, в новом терминале достаточно снова ввести команду запуска, и после того, как новое приложение запустится, оно автоматически закроет старое приложение.

Убедитесь, что все необходимые зависимости установлены и файл .env правильно настроен перед запуском приложения.