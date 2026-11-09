# personal-web

Osobní web Matyáše Kříže: kdo jsem a jak dělám weby.

Je to čisté HTML, CSS a JavaScript, bez build kroku a bez závislostí.

## Spuštění lokálně

Stačí otevřít `index.html` v prohlížeči, nebo spustit:

```bash
python3 -m http.server 8000
```

## Nasazení na GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Co upravit

- **Fotka:** v sekci „O mně“ nahraď `.photo-placeholder` za `<img src="foto.jpg" alt="Matyáš Kříž">`
- **E-mail:** v sekci „Kontakt“ změň `ahoj@example.com`
- **Projekty:** v sekci „Projekty“ doplň skutečné projekty, odkazy a obrázky
- **Sociální sítě:** odkazy na LinkedIn a Instagram v kontaktu
- **Čísla:** atributy `data-count` v sekci „O mně“
- **Technologie:** seznam tagů v sekci „Co dělám“
