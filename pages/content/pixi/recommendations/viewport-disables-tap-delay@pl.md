---
'$title': Wyłączanie opóźnienia dotknięcia
$order: 50
tags:
  - fid
---

Ustaw szerokość okienka ekranu zgodną z szerokością urządzenia, aby wyłączyć opóźnienie dotknięcia, które może zwiększyć FID. Aby usunąć to opóźnienie dotknięcia o 300–350 ms, zmień deklarację viewport w sekcji `<head>` swojej strony w następujący sposób:

```
<meta name="viewport" content="width=device-width">
```

To ustawia szerokość okienka ekranu taką samą jak szerokość urządzenie i stanowi ogólnie najlepszą praktykę w przypadku stron zoptymalizowanych pod kątem urządzeń mobilnych. Możesz [przeczytać więcej o wyłączeniu opóźnienia dotknięcia na web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
