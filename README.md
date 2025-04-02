# ProjektGrupowyFront

## Instalacja
Aby zainstalować i uruchomić projekt, wykonaj następujące kroki:

1. **Budowanie projektu**
    ```
    npm run build
    ```

2. **Budowanie obrazu Docker**
    ```
    docker build -t frontsavepenny:latest .
    ```

3. **Uruchomienie aplikacji**
    Aplikację można uruchomić za pomocą Dockera lub wykorzystać do tego projekt backendowy, który wykorzystuje powstały obraz tej aplikacji do tworzenia jej kontenera. W taki też sposób zaleca się krozystanie z tej aplikacji, to jest poprzez uruchomienie docker compose w aplikacji backendowej, któa skupia w sobie 3 kontenery: frontend, backend oraz bazę danych