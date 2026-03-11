---
applyTo: "data/**,backend/src/data/**,dashboard/src/data/**"
---

# Mock Data — Bella Napoli Italian Theme

All mock and seed data in this application represents **Bella Napoli**, an
Italian trattoria & wine bar. Item names, categories, and descriptions must
remain authentically Italian. Use the following category vocabulary:

| Category | Examples |
| :--- | :--- |
| **Antipasti** | Bruschetta, Caprese, Arancini, Burrata, Carpaccio |
| **Pizza** | Margherita, Diavola, Quattro Formaggi, Marinara |
| **Pasta** | Carbonara, Cacio e Pepe, Lasagna, Pappardelle, Linguine |
| **Risotto** | Funghi Porcini, Frutti di Mare, Nero di Seppia |
| **Secondi** | Bistecca Fiorentina, Osso Buco, Pollo, Vitello, Agnello |
| **Seafood** | Salmone, Branzino, Gamberoni, Tonno, Aragosta |
| **Zuppe** | Minestrone, Ribollita, Zuppa di Pesce |
| **Insalate** | Panzanella, Insalata Verde, Insalata di Mare |
| **Contorni** | Patate al Forno, Polenta, Spinaci, Radicchio |
| **Desserts** | Tiramisu, Cannoli, Panna Cotta, Babà, Semifreddo |
| **Wine** | Chianti, Barolo, Brunello, Prosecco, Amarone |
| **Cocktails** | Aperol Spritz, Negroni, Limoncello Spritz, Espresso Martini |
| **Beverages** | Espresso, Cappuccino, Grappa, Amaro, Limoncello |
| **Kids** | Kids Pasta al Burro, Kids Pizza Margherita, Kids Cotoletta |

> Do **not** introduce non-Italian items (e.g., "Ribeye Steak", "Garden Salad",
> "Veggie Wrap") into mock data. Any new seed data must follow the Italian theme.

## Faker Seeding

* Always use a fixed seed value in Faker scripts for reproducible test datasets.
* Example: `fake = Faker(); Faker.seed(42)`
