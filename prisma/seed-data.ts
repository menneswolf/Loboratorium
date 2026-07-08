/* =============================================================================
 *  SEED DATA — the real loboratorium.be catalogue (EN/NL/FR).
 *  Seeds the Product table on first run (npm run db:seed). After that the
 *  database is the source of truth (edit via /admin/products).
 * ========================================================================== */

export const seedProducts = [
  {
    "id": "spotify-sleutelhanger",
    "slug": "spotify-sleutelhanger",
    "price": 4.99,
    "category": "keychains",
    "image": "/images/spotify-sleutelhanger.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Spotify Key Holder",
      "fr": "Porte-clés Spotify",
      "nl": "Spotify sleutelhanger"
    },
    "description": {
      "en": "Give your keys a personal touch with this unique 3D-printed Spotify key holder. Scan the code to play your favorite song directly in the Spotify app!",
      "fr": "Donnez une touche personnelle à vos clés avec ce porte-clés Spotify imprimé en 3D. Scannez le code pour jouer à votre chanson préférée directement dans l'application Spotify !",
      "nl": "Ben je op zoek naar een uniek cadeau of een persoonlijke touch aan je sleutelbos? Deze 3D-geprinte Spotify-sleutelhanger is d&eacute; perfecte manier om je favoriete liedje, artiest of moment altijd bij je te dragen. Via de scanbare Spotify-code speel je jouw gekozen nummer direct af in de Spotify-app! ✨ Kenmerken:…"
    }
  },
  {
    "id": "monstera-onderlegger-plant-inclusief-3d-geprinte-pot",
    "slug": "monstera-onderlegger-plant-inclusief-3d-geprinte-pot",
    "price": 24.99,
    "category": "plants",
    "image": "/images/monstera-onderlegger-plant-inclusief-3d-geprinte-pot.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Monstera Plant with 3D-Printed Pot",
      "fr": "Plante Monstera avec pot imprimé en 3D",
      "nl": "Monstera onderlegger plant | Inclusief 3D geprinte pot"
    },
    "description": {
      "en": "Elevate your space with this stylish and functional Monstera plant, complete with a 3D-printed pot. Perfect for plant lovers, interior design enthusiasts, or as a unique addition to your home.",
      "fr": "Élèvez votre espace avec cette plante Monstera stylée et fonctionnelle, complète avec un pot imprimé en 3D. Parfait pour les amoureux des plantes, les enthousiastes de design d'intérieur ou comme une touche unique pour votre maison.",
      "nl": "Waarom je deze wilt hebben: 🍃 Slim &amp; Stijlvol: Onderzetters die er niet uitzien als onderzetters, maar als een kunstige plant. 🖨️ 3D-geprint met oog voor detail 🟢 Duurzaam PLA-materiaal 🎁 Perfect als cadeau voor plantenliefhebbers, interieurfans of als unieke toevoeging aan je eigen woonruimte 💡 Tip: Staat…"
    }
  },
  {
    "id": "cactus-sateprikker-houder",
    "slug": "cactus-sateprikker-houder",
    "price": 19.99,
    "category": "kitchen",
    "image": "/images/cactus-sateprikker-houder.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Cactus Satay Holder",
      "fr": "Support pour satay en forme de cactus",
      "nl": "Cactus satéprikker houder"
    },
    "description": {
      "en": "Add a touch of whimsy to your kitchen with this unique cactus-shaped satay holder. Hygienic, easy to use, and perfect for parties or as a fun gadget.",
      "fr": "Ajoutez une touche d'humour à votre cuisine avec ce support pour satay en forme de cactus. Hygiénique, facile à utiliser et parfait pour les fêtes ou comme un gadget amusant.",
      "nl": "Waarom jij deze wilt hebben: 🌵 Uniek cactusdesign – lijkt net een echte plant! 🦷 Hygi&euml;nisch &amp; handig: geen gegrabbel in een potje meer 🖐️ Eenvoudig te gebruiken: druk bovenop en de tandenstokers komen eruit 🎉 Ideaal voor feestjes, borreltafels of gewoon als grappige gadget in je keuken 🖨️ Materiaal: Ho…"
    }
  },
  {
    "id": "erwtenplant-kabel-organiser",
    "slug": "erwtenplant-kabel-organiser",
    "price": 19.99,
    "category": "storage",
    "image": "/images/erwtenplant-kabel-organiser.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "String of Pearls Cable Organizer",
      "fr": "Organisateur de câbles en forme de perles",
      "nl": "erwtenplant kabel organiser"
    },
    "description": {
      "en": "Stay organized in style with this clever cable organizer, inspired by the popular String of Pearls plant. Perfect for your desk, shelf, or media console.",
      "fr": "Restez organisé avec style grâce à cet organisateur de câbles ingénieux, inspiré de la plante populaire String of Pearls. Parfait pour votre bureau, étagère ou console média.",
      "nl": "Deze slimme String of Pearls Cable Organizer is ge&iuml;nspireerd op de populaire hangplant, maar met een verrassend functionele twist: het helpt je kabels en snoeren netjes te organiseren, terwijl het eruitziet als een stijlvolle kamerplant. Ideaal voor op je bureau, plank of mediameubel! Waarom dit jouw volgende m…"
    }
  },
  {
    "id": "gearticuleerde-draak",
    "slug": "gearticuleerde-draak",
    "price": 5,
    "category": "decor",
    "image": "/images/gearticuleerde-draak.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Articulated Dragon",
      "fr": "Dragon articulé",
      "nl": "gearticuleerde draak"
    },
    "description": {
      "en": "Bring magic to life with this stunning 3D-printed flexible dragon. Made from durable green PLA material, it's not only a impressive decorative piece but also delightfully flexible.",
      "fr": "Faites vivre la magie avec ce dragon flexible imprimé en 3D. Fabriqué à partir de matériaux PLA verts durables, il est non seulement une pièce décorative impressionnante, mais également délicieusement flexible.",
      "nl": "Breng magie tot leven met deze prachtige 3D-geprinte flexibele draak!Deze unieke draak, gemaakt van duurzaam groen PLA-materiaal, is niet alleen een indrukwekkend decorstuk, maar ook heerlijk buigzaam dankzij het slimme scharnierende ontwerp. Perfect voor op je bureau, in je displaykast of als origineel cadeau voor…"
    }
  },
  {
    "id": "hexagonale-fidget-toy",
    "slug": "hexagonale-fidget-toy",
    "price": 3.99,
    "category": "games",
    "image": "/images/hexagonale-fidget-toy.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Hexagonal Fidget Toy",
      "fr": "Jouet anti-stress hexagonal",
      "nl": "Hexagonale fidget toy"
    },
    "description": {
      "en": "Find your calm with this fun hexagonal fidget toy, perfect for relieving stress or simply playing around.",
      "fr": "Trouvez votre calme avec ce jouet anti-stress hexagonal amusant, parfait pour soulager le stress ou simplement pour s'amuser.",
      "nl": "Deze leuke fidget toy is de perfecte oplossing tegen stress of gewoon om mee te spelen."
    }
  },
  {
    "id": "magnetivy-de-klimmende-magneet",
    "slug": "magnetivy-de-klimmende-magneet",
    "price": 17.99,
    "category": "kitchen",
    "image": "/images/magnetivy-de-klimmende-magneet.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Magnetivy - The Climbing Magnet",
      "fr": "Magnetivy - Le aimant grimpant",
      "nl": "Magnetivy | De klimmende magneet"
    },
    "description": {
      "en": "Bring a touch of green joy to your kitchen or workspace with Magnetivy, a flexible print-in-place ivy magnet that's both decorative and super handy.",
      "fr": "Apportez une touche de joie verte à votre cuisine ou espace de travail avec Magnetivy, un aimant grimpant flexible imprimé en place qui est à la fois décoratif et très pratique.",
      "nl": "Breng een vleugje groen geluk in je keuken of werkplek met de Magnetivy&trade; – een flexibele print-in-place klimopmagnet die zowel decoratief als superhandig is.Met buigbare stengels en blaadjes die echt leven lijken te krijgen, kun je zelf creatieve vormen maken terwijl ze je foto&rsquo;s, boodschappenlijstjes en…"
    }
  },
  {
    "id": "dagbloem-magneet",
    "slug": "dagbloem-magneet",
    "price": 17.99,
    "category": "kitchen",
    "image": "/images/dagbloem-magneet.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Morning Glory Magnet",
      "fr": "Aimant Belle de Jour",
      "nl": "Dagbloem magneet"
    },
    "description": {
      "en": "Give your kitchen, office, or workshop a fresh, floral makeover with Morning Glory, a print-in-place ivy magnet with beautiful flowers.",
      "fr": "Donnez à votre cuisine, bureau ou atelier un look frais et floral avec Belle de Jour, un aimant grimpant imprimé en place avec de belles fleurs.",
      "nl": "Geef je keuken, kantoor of werkplaats een frisse, fleurige make-over met Morning Glory&trade; – een print-in-place klimopmagnet m&eacute;t prachtige bloemen.Net als bij de Magnetivy kun je de stengels buigen en vormen, maar hier schitteren ook kleurrijke bloemen die je helemaal zelf kunt positioneren. ✨ Waarom je &l…"
    }
  },
  {
    "id": "cornucopia-beker-labels",
    "slug": "cornucopia-beker-labels",
    "price": 19.99,
    "category": "kitchen",
    "image": "/images/cornucopia-beker-labels.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Cornucopia Cup Labels",
      "fr": "Étiquettes de verre Cornucopia",
      "nl": "Cornucopia beker labels"
    },
    "description": {
      "en": "Transform your party table with Cornucopia - a horn of plenty drink marker set featuring fun autumn bites that clip onto your glass. No more glass chaos! The elegant holder keeps your markers stylishly together. 9 unique mini food markers: from apple to pumpkin - choose your favorite! With lid: handy for storage.",
      "fr": "Transformez votre table de fête avec Cornucopia - un jeu de marqueurs de verre en forme de corne d'abondance avec de petites bouchées d'automne amusantes qui se fixent sur votre verre. Plus de chaos de verres ! Le support élégant rassemble vos marqueurs de manière stylée. 9 marqueurs de nourriture mini uniques : de la pomme à la citrouille - choisissez votre préféré ! Avec couvercle : pratique pour le rangement.",
      "nl": "Tover je feesttafel om met CornuCupia&trade; &mdash; een hoorn-des-overvloeds drinkmarker-set vol leuke herfsthapjes die je op je glas kunt klikken. Geen chaos meer met glazen! Sierlijke houder: pakt je markers stijlvol samen. 9 unieke minifood markers: van appel tot pompoen &mdash; kies je favoriet! Met deksel: han…"
    }
  },
  {
    "id": "cactus-peper-en-zoutstrooier",
    "slug": "cactus-peper-en-zoutstrooier",
    "price": 17.5,
    "category": "kitchen",
    "image": "/images/cactus-peper-en-zoutstrooier.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Cactus Pepper and Salt Shaker",
      "fr": "Poissons de cactus poivre et sel",
      "nl": "Cactus peper- en zoutstrooier"
    },
    "description": {
      "en": "Add a touch of excitement to your dinner table with the Cactus Pepper and Salt Shaker - a smart 3D-printed set that's as fun to look at as it is to use. This cactus is full of flavor and surprises: the pot sprinkles pepper, the cactus itself sprinkles salt, and the flower on top is a secret refill funnel!",
      "fr": "Ajoutez une touche d'excitation à votre table à dîner avec le poivrier et le sel en forme de cactus - un jeu intelligent imprimé en 3D qui est aussi amusant à regarder qu'à utiliser. Ce cactus est plein de saveur et de surprises : le pot saupoudre de poivre, le cactus lui-même saupoudre de sel, et la fleur sur le dessus est un entonnoir de recharge secret !",
      "nl": "Maak je eettafel een tikje prikkelender met de Cactus Peper- en Zoutstrooier – een slimme 3D-geprinte set die even leuk is om te zien als om te gebruiken. Deze cactus zit boordevol smaak &eacute;n verrassingen: de pot strooit peper, de cactus zelf strooit zout, en de bloem bovenop is stiekem je vul-trechter! ✨ Waaro…"
    }
  },
  {
    "id": "spikey-sleutelhouder",
    "slug": "spikey-sleutelhouder",
    "price": 17.5,
    "category": "keychains",
    "image": "/images/spikey-sleutelhouder.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "SpiKey Key Holder",
      "fr": "SpiKey Porte-clés",
      "nl": "SpiKey sleutelhouder"
    },
    "description": {
      "en": "Say goodbye to getting lost in the key cabinet with the Spikey Key Holder - a sturdy cactus-shaped key hanger that keeps your keys organized and always within reach. This little prickly ball is not only practical but also a fun eye-catcher in the house!",
      "fr": "Dites adieu à la perte dans le placard à clés avec le SpiKey Porte-clés - un porte-clés en forme de cactus robuste qui garde vos clés organisées et toujours à portée de main. Cette petite balle piquante est non seulement pratique, mais aussi un attrait visuel amusant dans la maison !",
      "nl": "Zeg vaarwel tegen verdwalen in de sleutelkast met de Spikey Sleutelhouder &mdash; een stoere cactusvormige sleutelhanger die je sleutels georganiseerd en altijd binnen handbereik houdt. Deze kleine prikkelbal is niet alleen praktisch, maar ook een leuke blikvanger in huis! ✨ Waarom je &lsquo;m wilt hebben 🔑 Altijd…"
    }
  },
  {
    "id": "cactikeys-sleutelhouder",
    "slug": "cactikeys-sleutelhouder",
    "price": 19.99,
    "category": "keychains",
    "image": "/images/cactikeys-sleutelhouder.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "CactiKeys Key Holder",
      "fr": "CactiKeys Porte-clés",
      "nl": "CactiKeys sleutelhouder"
    },
    "description": {
      "en": "Say goodbye to getting lost in the key cabinet with the Cactikey Key Holder - a sturdy cactus-shaped key hanger that keeps your keys organized and always within reach. This little prickly ball is not only practical but also a fun eye-catcher in the house!",
      "fr": "Dites adieu à la perte dans le placard à clés avec le Cactikey Porte-clés - un porte-clés en forme de cactus robuste qui garde vos clés organisées et toujours à portée de main. Cette petite balle piquante est non seulement pratique, mais aussi un attrait visuel amusant dans la maison !",
      "nl": "Zeg vaarwel tegen verdwalen in de sleutelkast met de Cactikey Sleutelhouder &mdash; een stoere cactusvormige sleutelhanger die je sleutels georganiseerd en altijd binnen handbereik houdt. Deze kleine prikkelbal is niet alleen praktisch, maar ook een leuke blikvanger in huis! ✨ Waarom je &lsquo;m wilt hebben 🔑 Altij…"
    }
  },
  {
    "id": "venus-snacktrap-sluitclips",
    "slug": "venus-snacktrap-sluitclips",
    "price": 24.99,
    "category": "kitchen",
    "image": "/images/venus-snacktrap-sluitclips.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Venus SnackTrap Clips",
      "fr": "Clips de rangement de snacks Venus",
      "nl": "Venus SnackTrap sluitclips"
    },
    "description": {
      "en": "Keep your chips, candy, and snacks fresh with the Venus Snacktrap - a cheerful set of clips in the shape of carnivorous plant leaves! These handy clips keep your packaging tightly closed and look super cute on your countertop or desk.",
      "fr": "Gardez vos chips, vos bonbons et vos snacks frais avec les clips de rangement de snacks Venus - un jeu de clips en forme de feuilles de plante carnivore ! Ces clips pratiques maintiennent vos emballages fermés et ont l'air super mignons sur votre comptoir ou votre bureau.",
      "nl": "Hou je chips, snoep en snacks lekker vers met de Venus Snacktrap &mdash; een vrolijke set van clipjes in de vorm van de bladeren van een vleesetende plant! Deze handige clips houden je verpakkingen stevig dicht &eacute;n zien er ook nog eens supercute uit op je aanrecht of bureau. ✨ Waarom je &lsquo;m wilt hebben 🌿…"
    }
  },
  {
    "id": "aromatische-orchidee",
    "slug": "aromatische-orchidee",
    "price": 24.99,
    "category": "plants",
    "image": "/images/aromatische-orchidee.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Aromatic Orchid",
      "fr": "Orchidée aromatique",
      "nl": "Aromatische orchidee"
    },
    "description": {
      "en": "Bring your favorite scents to life with the Aromatic Orchid. This elegant orchid is not only a beautiful decoration but also a subtle diffuser where you can add fragrance or essential oil. Enjoy a lovely atmosphere every day!",
      "fr": "Donnez vie à vos parfums préférés avec l'Orchidée aromatique. Cette orchidée élégante est non seulement une décoration magnifique, mais aussi un diffuseur subtil où vous pouvez ajouter un parfum ou une huile essentielle. Profitez d'une atmosphère agréable chaque jour !",
      "nl": "Breng jouw favoriete geuren tot leven met de Aromatische Orchidee. Deze elegante orchidee is niet alleen een prachtige decoratie, maar ook een subtiele diffuser waar je geur- of essenti&euml;le olie in kunt doen. Zo geniet je van een heerlijke sfeer, elke dag opnieuw! ✨ Waarom deze orchidee jouw nieuwe favoriet word…"
    }
  },
  {
    "id": "lily-pad-cupholder",
    "slug": "lily-pad-cupholder",
    "price": 19.99,
    "category": "kitchen",
    "image": "/images/lily-pad-cupholder.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Lily Pad Cupholder",
      "fr": "Support de verre Nénuphar",
      "nl": "Lily Pad Cupholder"
    },
    "description": {
      "en": "Relax by the pool with the adorable Lily Pad Cupholder - a 3D-printed floating cup holder in the shape of a water lily leaf. It keeps your drink steady while you float, without worrying about it tipping over!",
      "fr": "Détendez-vous près de la piscine avec le support de verre Nénuphar - un support de verre flottant imprimé en 3D en forme de feuille de nénuphar. Il maintient votre boisson stable pendant que vous flottez, sans vous inquiéter de la renverser !",
      "nl": "Relax aan het zwembad met de schattige Lily Pad Cupholder &mdash; een 3D-geprinte drijvende bekerhouder in de vorm van een waterlelieblad. Hij houdt je drankje stevig vast terwijl jij lekker dobbert, zonder dat je bang hoeft te zijn dat &lsquo;ie kopje onder gaat! ✨ Waarom je &lsquo;m wilt hebben 🌊 Blijft drijven &…"
    }
  },
  {
    "id": "fizzy-frog",
    "slug": "fizzy-frog",
    "price": 4.99,
    "category": "kitchen",
    "image": "/images/fizzy-frog.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Fizzy Frog",
      "fr": "Grenouille Fizzy",
      "nl": "Fizzy Frog"
    },
    "description": {
      "en": "The Fizzy Frog is a fun, functional can lid that protects your drink from insects, splashes, and dirt. It's designed to fit over a standard can and features a hinged top that can be closed. What you get: a can lid in the shape of a frog!",
      "fr": "La Grenouille Fizzy est un couvercle de canette amusant et fonctionnel qui protège votre boisson des insectes, des éclaboussures et de la saleté. Il est conçu pour s'adapter sur une canette standard et dispose d'un couvercle à charnière qui peut être fermé. Ce que vous obtenez : un couvercle de canette en forme de grenouille !",
      "nl": "De Fizzy Frog is een leuke, functionele afdichting voor blikjes die je drankje beschermt tegen insecten, spatten en vuil. Het is ontworpen om over een standaard blikje te klikken en beschikt over een scharnierende kop die je kunt sluiten. Wat je krijgt / wat het doet Een blikdeksel in de vorm van een kikker (&ldquo;…"
    }
  },
  {
    "id": "smactus-cactus-coaster",
    "slug": "smactus-cactus-coaster",
    "price": 9.99,
    "category": "decor",
    "image": "/images/smactus-cactus-coaster.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Smactus Cactus coaster",
      "fr": "Smactus Cactus coaster",
      "nl": "Smactus Cactus coaster"
    },
    "description": {
      "en": "Meet the Smactus Cactus, a playful and stylish design piece that's both decorative and functional. This cactus is not just a plant, but your new favorite coaster and organizer in one. Simply press it flat to use as a coaster when you have a drink, and you're all set.",
      "fr": "Découvrez le Smactus Cactus, un élément de design ludique et stylé à la fois décoratif et fonctionnel. Ce cactus n'est pas juste une plante, mais votre nouveau porte-verre et organisateur préféré en un. Il suffit de l'aplatir pour l'utiliser comme sous-verre lorsque vous avez un verre, et vous êtes prêt.",
      "nl": "Ontmoet de Smactus Cactus: een speels en stijlvol stukje design dat zowel decoratief is als functioneel. Deze cactus is niet zomaar een plant, maar jouw nieuwe favoriete onderzetter &eacute;n organizer in &eacute;&eacute;n. Wanneer je drankje staat, druk je de cactus plat voor gebruik als onderzetter. Klaar met drin…"
    }
  },
  {
    "id": "waffle-stacks",
    "slug": "waffle-stacks",
    "price": 24.99,
    "category": "games",
    "image": "/images/waffle-stacks.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Waffle stacks",
      "fr": "Waffle stacks",
      "nl": "Waffle stacks"
    },
    "description": {
      "en": "The classic game of Connect Four gets a tasty twist with Waffle Stacks, a magnetic strategy game that's as fun to play as it is beautiful to look at and convenient to store. What makes Waffle Stacks special? Win by getting five in a row (horizontally, vertically, or diagonally).",
      "fr": "Le jeu classique de Quatre en ligne reçoit un twist savoureux avec Waffle Stacks, un jeu de stratégie magnétique qui est aussi amusant à jouer qu'il est beau à regarder et pratique à ranger. Qu'est-ce qui rend Waffle Stacks spécial ? Gagnez en alignant cinq pièces (horizontalement, verticalement ou en diagonale).",
      "nl": "Het klassieke spel vier op een rij krijgt een smakelijke twist met Waffle Stacks, een magnetisch strategiespel dat niet alleen leuk is om te spelen, maar ook mooi om te zien &eacute;n handig op te bergen. Wat maakt Waffle Stacks speciaal? Speel vijf op een rij (horizontaal, verticaal of diagonaal) om te winnen. Gebr…"
    }
  },
  {
    "id": "snack-attack",
    "slug": "snack-attack",
    "price": 29.99,
    "category": "games",
    "image": "/images/snack-attack.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Snack Attack",
      "fr": "Snack Attack",
      "nl": "Snack Attack"
    },
    "description": {
      "en": "Snack Attack is a cheerful and strategic game where you must protect your picnic full of treats from your opponent. With snacks like hot dogs, cheese, cake, and watermelon, try to cleverly get five in a row while thwarting each other with bug sprays and traps. Includes game board, picnic basket, and more.",
      "fr": "Snack Attack est un jeu joyeux et stratégique où vous devez protéger votre pique-nique rempli de friandises de votre adversaire. Avec des snacks comme des hot-dogs, du fromage, du gâteau et de la pastèque, essayez de mettre cinq en ligne de manière astucieuse tout en vous gênant mutuellement avec des sprays anti-insectes et des pièges. Comprend le plateau de jeu, le panier de pique-nique, et plus encore.",
      "nl": "Snack Attack is een vrolijk en strategisch spel waarin je picknick vol lekkernijen moet beschermen tegen de tegenstander. Met snacks zoals hotdogs, kaas, cake en watermeloen probeer je slim vijf op een rij te halen, terwijl je elkaar dwarsboomt met insectenverjagers en vergifvallen. Inclusief speelbord, picknickmand…"
    }
  },
  {
    "id": "bonsai-calendar",
    "slug": "bonsai-calendar",
    "price": 49.99,
    "category": "decor",
    "image": "/images/bonsai-calendar.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Bonsai Calendar",
      "fr": "Bonsai Calendar",
      "nl": "Bonsai Calendar"
    },
    "description": {
      "en": "The Bonsai 365 Calendar turns keeping track of time into a peaceful and almost meditative ritual. Instead of boring numbers or blocks, you get to see a beautiful bonsai tree grow throughout the month. Each day, you place a leaf on the tree, until it's in full bloom by the end of the month. Then, simply switch to the next month's card.",
      "fr": "Le Calendrier Bonsai 365 transforme la prise de temps en un rituel paisible et presque méditatif. Au lieu de chiffres ou de blocs ennuyeux, vous voyez un beau bonsaï pousser tout au long du mois. Chaque jour, vous placez une feuille sur l'arbre, jusqu'à ce qu'il soit en pleine floraison à la fin du mois. Ensuite, il suffit de passer à la carte du mois suivant.",
      "nl": "De Bonsai 365 Kalender maakt van tijd bijhouden een rustig en bijna meditatief ritueel. In plaats van saaie cijfers of blokjes zie je een prachtige bonsaiboom groeien door de maand heen. Elke dag plaats je een blad op de boom, tot hij aan het einde van de maand volledig in bloei staat. Daarna wissel je de maandkaart…"
    }
  },
  {
    "id": "pilea-food-picker",
    "slug": "pilea-food-picker",
    "price": 24.99,
    "category": "kitchen",
    "image": "/images/pilea-food-picker.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Pilea Food Picker",
      "fr": "Pilea Food Picker",
      "nl": "Pilea Food Picker"
    },
    "description": {
      "en": "Bring fun to the table with the Pilea Food Picker! This charming plant helps decide what's for dinner: spin the stem, let a leaf fall, and the leaf chooses your meal. You can set your own dishes, so it's a surprising and personal moment every time. The leaves are magnetic, making it easy to customize and play.",
      "fr": "Apportez du plaisir à la table avec le Pilea Food Picker ! Cette plante charmante aide à décider ce que vous allez manger : faites tourner la tige, laissez une feuille tomber, et la feuille choisit votre repas. Vous pouvez définir vos propres plats, donc c'est un moment surprenant et personnel à chaque fois. Les feuilles sont magnétiques, ce qui facilite la personnalisation et le jeu.",
      "nl": "Breng plezier aan tafel met de Pilea Food Picker! Deze charmante plant helpt bepalen wat er gegeten wordt: draai aan de stengel, laat een blad naar voren vallen en het blad kiest jouw maaltijd. Je kunt zelf de gerechten bepalen, dus elke keer is het een verrassend &eacute;n persoonlijk moment. De bladeren zijn magne…"
    }
  },
  {
    "id": "cacti-chess",
    "slug": "cacti-chess",
    "price": 49.99,
    "category": "games",
    "image": "/images/cacti-chess.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Cacti Chess",
      "fr": "Cacti Chess",
      "nl": "Cacti Chess"
    },
    "description": {
      "en": "Meet Cacti Chess, a unique chess set where all the pieces are shaped like small cacti. A playful reinterpretation of the classic game, perfect for design, nature, and strategy lovers. Each cactus has its own character and role on the board — from the proud king to the clever pawn.",
      "fr": "Découvrez Cacti Chess, un jeu d'échecs unique où toutes les pièces sont en forme de petits cactus. Une interprétation ludique du jeu classique, parfaite pour les amoureux de design, de nature et de stratégie. Chaque cactus a son propre caractère et rôle sur le plateau — du roi fier au pion astucieux.",
      "nl": "Maak kennis met Cacti Chess, een unieke schaakset waarin alle stukken de vorm hebben van kleine cactussen. Een speelse herinterpretatie van het klassieke schaakspel, perfect voor liefhebbers van design, natuur en strategisch denken. Elke cactus heeft zijn eigen karakter en rol op het bord &mdash; van de trotse konin…"
    }
  },
  {
    "id": "sushi-chess",
    "slug": "sushi-chess",
    "price": 49.99,
    "category": "games",
    "image": "/images/sushi-chess.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Sushi Chess",
      "fr": "Sushi Chess",
      "nl": "Sushi Chess"
    },
    "description": {
      "en": "Sushi Chess is a playful reinvention of the classic game, where the pieces are transformed into delicious sushi rolls, nigiri, and other Japanese treats. Each pawn, bishop, and rook has its own unique sushi look, carefully designed to put a smile on your face. The board is designed in a beautiful, minimalist style to complement the sushi pieces.",
      "fr": "Sushi Chess est une réinvention ludique du jeu classique, où les pièces sont transformées en délicieux rouleaux de sushi, nigiri et autres spécialités japonaises. Chaque pion, fou et tour a son propre look de sushi unique, soigneusement conçu pour vous mettre un sourire sur le visage. Le plateau est conçu dans un style minimaliste beau pour compléter les pièces de sushi.",
      "nl": "Sushi Chess is een speelse heruitvinding van het klassieke schaakspel, waarin de stukken zijn omgetoverd tot heerlijke sushirollen, nigiri en andere Japanse lekkernijen. Elke pion, loper en toren heeft zijn eigen unieke sushi-look, zorgvuldig ontworpen om meteen een glimlach op te wekken. Het bord is ontworpen in be…"
    }
  },
  {
    "id": "dust-free-dragon-tree",
    "slug": "dust-free-dragon-tree",
    "price": 19.99,
    "category": "decor",
    "image": "/images/dust-free-dragon-tree.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Dust Free Dragon Tree",
      "fr": "Dust Free Dragon Tree",
      "nl": "Dust Free Dragon Tree"
    },
    "description": {
      "en": "Make cleaning more fun and easier with the Dust-Free Dragon Tree. This smart design combines three functions in one: a brush, dustbin, and dustpan in the style of an exotic plant structure. What does it do? The 'roots' of the plant work as a brush: you pull them out to sweep, and the 'trunk' serves as a dustbin and dustpan to collect the dirt.",
      "fr": "Rendez le nettoyage plus amusant et plus facile avec l'Arbre Dragon sans Poussière. Ce design intelligent combine trois fonctions en une : un pinceau, une poubelle et un plat à poussière dans le style d'une structure de plante exotique. Qu'est-ce qu'il fait ? Les 'racines' de la plante servent de pinceau : vous les sortez pour balayer, et le 'tronc' sert de poubelle et de plat à poussière pour recueillir la saleté.",
      "nl": "Maak schoonmaken leuker &eacute;n makkelijker met de Dust-Free Dragon Tree. Dit slimme ontwerp combineert drie functies in &eacute;&eacute;n: een borstel, vuilnisbak en vuilblik (dustpan) in de stijl van een exotische plant-structuur. Wat het doet De &ldquo;wortels&rdquo; van de plant werken als borstel: je trekt ze…"
    }
  },
  {
    "id": "bath-lillies",
    "slug": "bath-lillies",
    "price": 24.99,
    "category": "decor",
    "image": "/images/bath-lillies.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Bath Lillies",
      "fr": "Bath Lillies",
      "nl": "Bath Lillies"
    },
    "description": {
      "en": "Bring serenity and ambiance to your bathroom with the Bath Lillies. These charming water lilies gently float on the water's surface, creating a relaxing spa experience in the comfort of your own home. Fill them with fragrant bath oil or fizzing bath salts to slowly release a delightful scent.",
      "fr": "Apportez sérénité et ambiance à votre salle de bain avec les Bath Lillies. Ces nénuphars charmants flottent doucement sur la surface de l'eau, créant une expérience de spa relaxante dans le confort de votre propre maison. Remplissez-les d'huile de bain parfumée ou de sels de bain pétillants pour libérer lentement un parfum délicieux.",
      "nl": "Breng rust en sfeer in je badkamer met de Bath Lillies. Deze charmante waterlelies drijven zachtjes op het wateroppervlak en zijn ontworpen om een ontspannende spa-ervaring te cre&euml;ren in je eigen bad. Je kunt ze vullen met geurige badolie of bruisende badzoutkorrels, zodat ze langzaam een heerlijke geur verspre…"
    }
  },
  {
    "id": "forest-chess",
    "slug": "forest-chess",
    "price": 44.99,
    "category": "games",
    "image": "/images/forest-chess.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Forest Chess",
      "fr": "Forest Chess",
      "nl": "Forest Chess"
    },
    "description": {
      "en": "The Forest Chess Set is a unique chessboard in the shape of a tree trunk that rolls up when not in use. Once you remove the caps from the ends, the set unfolds into a full-fledged chessboard with adorable mushroom-themed pieces hidden inside the trunk. Perfect for nature lovers and chess enthusiasts alike.",
      "fr": "Le Forest Chess est un échiquier unique en forme de tronc d'arbre qui se roule lorsqu'il n'est pas utilisé. Une fois que vous retirez les bouchons des extrémités, le jeu se déploie en un échiquier complet avec des pièces à thème de champignons cachées à l'intérieur du tronc. Parfait pour les amoureux de la nature et les passionnés d'échecs.",
      "nl": "De Forest Chess Set is een bijzonder schaakbord in de vorm van een boomstam die je oprolt als je &lsquo;m even niet gebruikt. Zodra je de doppen aan de uiteinden verwijdert, ontvouwt de set zich in een volwaardig schaakbord met schattige, paddestoelthema-stukken verborgen in de stam. Perfect voor wie houdt van natuu…"
    }
  },
  {
    "id": "mirror-monstera",
    "slug": "mirror-monstera",
    "price": 9.99,
    "category": "decor",
    "image": "/images/mirror-monstera.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Mirror Monstera",
      "fr": "Mirror Monstera",
      "nl": "Mirror Monstera"
    },
    "description": {
      "en": "Each mirror leaf is carefully printed in high-quality PLA and can be attached using double-sided tape, giving the overall design the depth and charm of a real plant — but with a functional twist. The leaves can be placed individually or in a composition, allowing you to decide how to showcase your Mirror Monstera.",
      "fr": "Chaque feuille miroir est imprimée avec soin en PLA de haute qualité et peut être fixée à l'aide d'un ruban adhésif double face, donnant au design global la profondeur et le charme d'une plante réelle — mais avec une touche fonctionnelle. Les feuilles peuvent être placées individuellement ou en composition, vous permettant de décider comment présenter votre Mirror Monstera.",
      "nl": "Elke spiegelbladvorm is zorgvuldig geprint in hoogwaardige PLA en kan met dubblezeidige tape bevestigd worden waardoor het geheel de diepte en charme van een echte plant krijgt &mdash; maar dan met een functionele twist. De bladeren kunnen individueel worden geplaatst of in een compositie, zodat je zelf bepaalt hoe…"
    }
  },
  {
    "id": "cactus-coasters",
    "slug": "cactus-coasters",
    "price": 24.99,
    "category": "decor",
    "image": "/images/cactus-coasters.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Cactus Coasters",
      "fr": "Cactus Coasters",
      "nl": "Cactus Coasters"
    },
    "description": {
      "en": "The Cactus Coaster is a clever combination of design and functionality. Stacked together, the coasters form a decorative cactus in a pot — but when separated, they become multiple sturdy coasters for your drinks. Keep your table tidy and stylish with this innovative design.",
      "fr": "Le Cactus Coaster est une combinaison astucieuse de design et de fonctionnalité. Empilés, les sous-verres forment un cactus décoratif dans un pot — mais une fois séparés, ils deviennent plusieurs sous-verres robustes pour vos boissons. Gardez votre table propre et élégante avec ce design innovant.",
      "nl": "De Cactus Coaster is een slimme combinatie van design en functionaliteit. In elkaar gestapeld vormen de onderzetters samen een decoratieve cactus in een potje &mdash; maar haal je ze uit elkaar, dan heb je meerdere stevige onderzetters voor je drankjes. Zo staat je tafel er altijd netjes &eacute;n stijlvol bij. De s…"
    }
  },
  {
    "id": "invis-shelf",
    "slug": "invis-shelf",
    "price": 3.5,
    "category": "storage",
    "image": "/images/invis-shelf.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Invis Shelf",
      "fr": "Invis Shelf",
      "nl": "Invis Shelf"
    },
    "description": {
      "en": "Make your books literally float with the Invis Shelf! This ultra-thin shelf almost completely disappears behind the bottom cover of your book, creating the illusion that your bookstack is hanging freely against the wall. A minimalist and clever design that grabs attention without being visible itself.",
      "fr": "Faites flotter vos livres littéralement avec l'Invis Shelf ! Cette étagère ultra-fine disparaît presque complètement derrière la couverture inférieure de votre livre, créant l'illusion que votre pile de livres est suspendue librement contre le mur. Un design minimaliste et ingénieux qui attire l'attention sans être visible lui-même.",
      "nl": "Laat je boeken letterlijk zweven met de Invis Shelf! Deze ultradunne plank verdwijnt bijna volledig achter de onderste kaft van je boek, waardoor het lijkt alsof je boekenstapel los tegen de muur hangt. Een minimalistisch en slim design dat meteen de aandacht trekt, zonder zelf zichtbaar te zijn. De plank is geprint…"
    }
  },
  {
    "id": "leka-shelf",
    "slug": "leka-shelf",
    "price": 5.5,
    "category": "storage",
    "image": "/images/leka-shelf.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Leka Shelf",
      "fr": "Leka Shelf",
      "nl": "Leka Shelf"
    },
    "description": {
      "en": "The Leka Shelf is a modern wall shelf with a simple yet elegant design. No floating effect, just a reliable and stylish shelf that's meant to be seen. With its clean lines and subtle shape, it blends seamlessly into any interior — from modern to industrial. The shelf is printed in high-quality PLA for a durable finish.",
      "fr": "La Leka Shelf est une étagère murale moderne avec un design simple mais élégant. Pas d'effet de flottement, juste une étagère fiable et élégante qui est censée être vue. Avec ses lignes propres et sa forme discrète, elle s'intègre parfaitement dans tout intérieur — du moderne à l'industriel. L'étagère est imprimée en PLA de haute qualité pour une finition durable.",
      "nl": "De Leka Shelf is een moderne wandplank met een eenvoudig maar elegant ontwerp. Geen zwevend effect, maar een betrouwbare, stijlvolle plank die gezien mag worden. Met haar strakke lijnen en subtiele vorm past ze moeiteloos in elk interieur &mdash; van modern tot industrieel. De plank wordt geprint in hoogwaardige PLA…"
    }
  },
  {
    "id": "alder-pot",
    "slug": "alder-pot",
    "price": 19.99,
    "category": "plants",
    "image": "/images/alder-pot.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Alder Pot",
      "fr": "Alder Pot",
      "nl": "Alder Pot"
    },
    "description": {
      "en": "The Alder Pot is a modern planter that effortlessly combines functionality and style. The sleek design lets your plants take center stage, while the integrated drip tray ensures that excess water is neatly caught — no more wet windowsills! Each pot is carefully printed in high-quality PLA for a durable and long-lasting finish.",
      "fr": "Le pot Alder est un pot de plantes moderne qui combine sans effort fonctionnalité et style. Le design élégant met vos plantes en valeur, tandis que le bac de réception intégré s'assure que l'eau excédentaire est proprement capturée — plus de fenêtres mouillées ! Chaque pot est imprimé avec soin en PLA de haute qualité pour une finition durable et longue durée de vie.",
      "nl": "De Alder Pot is een moderne plantenpot die functionaliteit en stijl moeiteloos combineert. Het strakke ontwerp laat jouw planten echt opvallen, terwijl de ge&iuml;ntegreerde drip tray (opvangschaaltje) ervoor zorgt dat overtollig water netjes wordt opgevangen – geen natte vensterbanken meer! Elke pot wordt geprint i…"
    }
  },
  {
    "id": "verdin-pot",
    "slug": "verdin-pot",
    "price": 9.99,
    "category": "plants",
    "image": "/images/verdin-pot.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Verdin Pot",
      "fr": "Verdin Pot",
      "nl": "Verdin Pot"
    },
    "description": {
      "en": "The Verdin Pot is a modern planter that seamlessly blends functionality and style. The sleek design showcases your plants, while the integrated drip tray ensures that excess water is neatly caught — eliminating wet windowsills. Each pot is carefully printed in high-quality PLA for a durable and long-lasting finish.",
      "fr": "Le pot Verdin est un pot de plantes moderne qui allie sans effort fonctionnalité et style. Le design élégant met vos plantes en valeur, tandis que le bac de réception intégré s'assure que l'eau excédentaire est proprement capturée — éliminant les fenêtres mouillées. Chaque pot est imprimé avec soin en PLA de haute qualité pour une finition durable et longue durée de vie.",
      "nl": "De Verdin Pot is een moderne plantenpot die functionaliteit en stijl moeiteloos combineert. Het strakke ontwerp laat jouw planten echt opvallen, terwijl de ge&iuml;ntegreerde drip tray (opvangschaaltje) ervoor zorgt dat overtollig water netjes wordt opgevangen – geen natte vensterbanken meer! Elke pot wordt geprint…"
    }
  },
  {
    "id": "kiva-pot",
    "slug": "kiva-pot",
    "price": 9.99,
    "category": "plants",
    "image": "/images/kiva-pot.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Kiva Pot",
      "fr": "Kiva Pot",
      "nl": "Kiva Pot"
    },
    "description": {
      "en": "Elevate your plant game with the Kiva Pot, where form meets function. Its sleek design puts your plants in the spotlight, while the integrated drip tray keeps your windowsill tidy. Each pot is 3D printed in high-quality PLA for a durable and long-lasting finish.",
      "fr": "Élevez votre jeu de plante avec le Kiva Pot, où la forme rencontre la fonction. Son design élégant met vos plantes en valeur, tandis que le bac de réception intégré garde votre fenêtre propre. Chaque pot est imprimé en 3D en PLA de haute qualité pour une finition durable et longue durée.",
      "nl": "De Kiva Pot is een moderne plantenpot die functionaliteit en stijl moeiteloos combineert. Het strakke ontwerp laat jouw planten echt opvallen, terwijl de ge&iuml;ntegreerde drip tray (opvangschaaltje) ervoor zorgt dat overtollig water netjes wordt opgevangen – geen natte vensterbanken meer! Elke pot wordt geprint in…"
    }
  },
  {
    "id": "vela-pot",
    "slug": "vela-pot",
    "price": 9.99,
    "category": "plants",
    "image": "/images/vela-pot.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Vela Pot",
      "fr": "Vela Pot",
      "nl": "Vela Pot"
    },
    "description": {
      "en": "The Vela Pot is a masterclass in modern design, seamlessly blending style and functionality. Its sleek silhouette showcases your plants, while the built-in drip tray keeps messes at bay. Crafted from high-quality PLA, each pot is both sturdy and sustainable.",
      "fr": "Le Vela Pot est un modèle de design moderne, alliant sans effort le style et la fonctionnalité. Sa silhouette élégante met vos plantes en valeur, tandis que le bac de réception intégré élimine les dégâts. Fabriqué en PLA de haute qualité, chaque pot est à la fois solide et durable.",
      "nl": "De Vela Pot is een moderne plantenpot die functionaliteit en stijl moeiteloos combineert. Het strakke ontwerp laat jouw planten echt opvallen, terwijl de ge&iuml;ntegreerde drip tray (opvangschaaltje) ervoor zorgt dat overtollig water netjes wordt opgevangen – geen natte vensterbanken meer! Elke pot wordt geprint in…"
    }
  },
  {
    "id": "vesa-vaas",
    "slug": "vesa-vaas",
    "price": 14.99,
    "category": "decor",
    "image": "/images/vesa-vaas.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "96 × 96 × 220 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Vesa vase",
      "fr": "Vesa vase",
      "nl": "Vesa vaas"
    },
    "description": {
      "en": "Add a touch of elegance to any room with the Vesa vase, featuring a sleek and sophisticated design. Perfect for fresh or dried flowers, its minimalist shape and clean lines blend seamlessly into any interior, from modern to Scandinavian. Made from high-quality PLA, this vase is both sturdy and eco-friendly.",
      "fr": "Ajoutez une touche d'élégance à n'importe quelle pièce avec le vase Vesa, présentant un design élégant et sophistiqué. Parfait pour les fleurs fraîches ou séchées, sa forme minimaliste et ses lignes pures s'intègrent sans effort dans n'importe quel intérieur, du moderne au scandinave. Fabriqué en PLA de haute qualité, ce vase est à la fois solide et respectueux de l'environnement.",
      "nl": "De Vesa vaas is een moderne vaas met een strak en elegant ontwerp, perfect voor zowel verse bloemen als droogbloemen. Dankzij de minimalistische vorm en rustige lijnen past deze vaas moeiteloos in elk interieur, van modern tot Scandinavisch. De vaas is geprint in hoogwaardige PLA, wat zorgt voor een stevige, duurzam…"
    }
  },
  {
    "id": "dune-vaas",
    "slug": "dune-vaas",
    "price": 7.5,
    "category": "decor",
    "image": "/images/dune-vaas.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "96 × 97 × 197 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Dune vase",
      "fr": "Dune vase",
      "nl": "Dune vaas"
    },
    "description": {
      "en": "Bring a sense of refinement to your space with the Dune vase, boasting a sleek and elegant design. Suitable for both fresh and dried flowers, its understated shape and serene lines effortlessly complement any interior, from modern to Scandinavian. Printed in high-quality PLA, this vase is both durable and sustainable.",
      "fr": "Apportez un sentiment de raffinement à votre espace avec le vase Dune, présentant un design élégant et sophistiqué. Adapté aux fleurs fraîches et séchées, sa forme discrète et ses lignes sereines complètent sans effort n'importe quel intérieur, du moderne au scandinave. Imprimé en PLA de haute qualité, ce vase est à la fois durable et respectueux de l'environnement.",
      "nl": "De Dune vaas is een moderne vaas met een strak en elegant ontwerp, perfect voor zowel verse bloemen als droogbloemen. Dankzij de minimalistische vorm en rustige lijnen past deze vaas moeiteloos in elk interieur, van modern tot Scandinavisch. De vaas is geprint in hoogwaardige PLA, wat zorgt voor een stevige, duurzam…"
    }
  },
  {
    "id": "velto-gieter",
    "slug": "velto-gieter",
    "price": 9.99,
    "category": "plants",
    "image": "/images/velto-gieter.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "197 × 180 × 179 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Velto watering can",
      "fr": "Velto arrosoir",
      "nl": "Velto gieter"
    },
    "description": {
      "en": "The Velto watering can combines modern style with practical ease of use. Its slender shape and curved spout allow for controlled watering, minimizing spills. With a generous capacity and fine water flow, this can is perfect for both small houseplants and larger plants, indoors and out.",
      "fr": "L'arrosoir Velto allie le style moderne à la facilité d'utilisation pratique. Sa forme élancée et son bec courbe permettent un arrosage contrôlé, minimisant les dégâts. Avec une capacité généreuse et un débit d'eau fin, cet arrosoir est parfait pour les petites plantes d'intérieur et les plantes plus grandes, à l'intérieur et à l'extérieur.",
      "nl": "De Velto Gieter combineert een strak, modern ontwerp met praktisch gebruiksgemak. Dankzij de slanke vorm en gebogen schenktuit geef je planten gecontroleerd water, zonder te knoeien. De royale inhoud en fijne waterstroom maken de gieter geschikt voor zowel kleine kamerplanten als grotere planten, in huis &eacute;n b…"
    }
  },
  {
    "id": "bruta-spons-houder",
    "slug": "bruta-spons-houder",
    "price": 5.5,
    "category": "kitchen",
    "image": "/images/bruta-spons-houder.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "135 × 105 × 66 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Bruta sponge holder",
      "fr": "Bruta porte-éponge",
      "nl": "Bruta spons houder"
    },
    "description": {
      "en": "Keep your kitchen tidy and hygienic with the Bruta sponge holder, featuring a sleek and modern design. Its open shape allows for easy drainage and quick drying, reducing unpleasant odors and bacterial growth. Printed in high-quality PLA, this holder is sturdy, durable, and easy to clean.",
      "fr": "Gardez votre cuisine propre et hygiénique avec le porte-éponge Bruta, présentant un design moderne et élégant. Sa forme ouverte permet un égouttage facile et un séchage rapide, réduisant les odeurs désagréables et la croissance bactérienne. Imprimé en PLA de haute qualité, ce porte-éponge est solide, durable et facile à nettoyer.",
      "nl": "De Bruta Spons Houder is een strak vormgegeven accessoire dat zorgt voor orde en hygi&euml;ne bij de gootsteen. Dankzij het open ontwerp kan je spons goed uitlekken en sneller drogen, waardoor nare geurtjes en bacterievorming worden verminderd. Geprint in hoogwaardige PLA, is de spons houder stevig, duurzaam en makk…"
    }
  },
  {
    "id": "tela-vaas",
    "slug": "tela-vaas",
    "price": 7.5,
    "category": "decor",
    "image": "/images/tela-vaas.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "146 × 146 × 118 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Tela vase",
      "fr": "Tela vase",
      "nl": "Tela vaas"
    },
    "description": {
      "en": "Elevate your interior with the Tela vase, boasting a sleek and elegant design. Perfect for fresh or dried flowers, its minimalist shape and serene lines blend effortlessly into any room, from modern to Scandinavian. Made from high-quality PLA, this vase is both sturdy and eco-friendly.",
      "fr": "Élevez votre intérieur avec le vase Tela, présentant un design élégant et sophistiqué. Parfait pour les fleurs fraîches ou séchées, sa forme minimaliste et ses lignes sereines s'intègrent sans effort dans n'importe quelle pièce, du moderne au scandinave. Fabriqué en PLA de haute qualité, ce vase est à la fois solide et respectueux de l'environnement.",
      "nl": "De Tela vaas is een moderne vaas met een strak en elegant ontwerp, perfect voor zowel verse bloemen als droogbloemen. Dankzij de minimalistische vorm en rustige lijnen past deze vaas moeiteloos in elk interieur, van modern tot Scandinavisch. De vaas is geprint in hoogwaardige PLA, wat zorgt voor een stevige, duurzam…"
    }
  },
  {
    "id": "noka-gieter",
    "slug": "noka-gieter",
    "price": 7.5,
    "category": "plants",
    "image": "/images/noka-gieter.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "183 × 133 × 180 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Noka watering can",
      "fr": "Noka arrosoir",
      "nl": "Noka gieter"
    },
    "description": {
      "en": "The Noka watering can combines modern style with practical ease of use. Its slender shape and curved spout allow for controlled watering, minimizing spills. With a generous capacity and fine water flow, this can is perfect for both small houseplants and larger plants, indoors and out.",
      "fr": "L'arrosoir Noka allie le style moderne à la facilité d'utilisation pratique. Sa forme élancée et son bec courbe permettent un arrosage contrôlé, minimisant les dégâts. Avec une capacité généreuse et un débit d'eau fin, cet arrosoir est parfait pour les petites plantes d'intérieur et les plantes plus grandes, à l'intérieur et à l'extérieur.",
      "nl": "De Noka Gieter combineert een strak, modern ontwerp met praktisch gebruiksgemak. Dankzij de slanke vorm en gebogen schenktuit geef je planten gecontroleerd water, zonder te knoeien. De royale inhoud en fijne waterstroom maken de gieter geschikt voor zowel kleine kamerplanten als grotere planten, in huis &eacute;n bu…"
    }
  },
  {
    "id": "drift-spons-houder",
    "slug": "drift-spons-houder",
    "price": 3.99,
    "category": "kitchen",
    "image": "/images/drift-spons-houder.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "154 × 88 × 88 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Drift Sponge Holder",
      "fr": "Support d'éponge Drift",
      "nl": "Drift spons houder"
    },
    "description": {
      "en": "Add a touch of elegance to your kitchen sink with the Drift Sponge Holder. Its sleek design ensures your sponge dries quickly, reducing unpleasant odors and bacterial growth. Made from high-quality PLA, this holder is sturdy, durable, and easy to clean.",
      "fr": "Ajoutez une touche d'élégance à votre évier avec le Support d'éponge Drift. Son design élégant assure que votre éponge sèche rapidement, réduisant les odeurs désagréables et la croissance bactérienne. Fabriqué à partir de PLA de haute qualité, ce support est solide, durable et facile à nettoyer.",
      "nl": "De Drift Spons Houder is een strak vormgegeven accessoire dat zorgt voor orde en hygi&euml;ne bij de gootsteen. Dankzij het open ontwerp kan je spons goed uitlekken en sneller drogen, waardoor nare geurtjes en bacterievorming worden verminderd. Geprint in hoogwaardige PLA, is de spons houder stevig, duurzaam en makk…"
    }
  },
  {
    "id": "ripple-tissue-doos",
    "slug": "ripple-tissue-doos",
    "price": 9.99,
    "category": "storage",
    "image": "/images/ripple-tissue-doos.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "151 × 137 × 152 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Ripple Tissue Box",
      "fr": "Boîte de tissues Ripple",
      "nl": "Ripple tissue doos"
    },
    "description": {
      "en": "Elevate your home decor with the Ripple Tissue Box, a stylish and serene cover designed to fit standard tissue boxes. Its modern design blends seamlessly into any room, from the living room to the bedroom or bathroom. Made from high-quality PLA, this cover is both durable and stylish.",
      "fr": "Élèvez votre décoration intérieure avec la Boîte de tissues Ripple, un couvercle élégant et serein conçu pour les boîtes de tissues standard. Son design moderne se fond parfaitement dans n'importe quelle pièce, de la salle de séjour à la chambre ou à la salle de bain. Fabriqué à partir de PLA de haute qualité, ce couvercle est à la fois durable et élégant.",
      "nl": "De Ripple Tissue Doos geeft standaard tissue dozen een stijlvolle en rustige uitstraling. Ontworpen voor vierkante tissue dozen, verbergt deze cover de originele verpakking en past hij perfect in een modern interieur, zowel in de woonkamer, slaapkamer als badkamer. De cover is geprint in hoogwaardige PLA, wat zorgt…"
    }
  },
  {
    "id": "alder-fruitschaal",
    "slug": "alder-fruitschaal",
    "price": 9.99,
    "category": "kitchen",
    "image": "/images/alder-fruitschaal.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "246 × 220 × 74 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Alder Fruit Bowl",
      "fr": "Bol de fruits Alder",
      "nl": "Alder fruitschaal"
    },
    "description": {
      "en": "Bring a touch of modernity to your kitchen with the Alder Fruit Bowl, a sleek and airy design that beautifully showcases your fresh fruit while keeping it fresh for longer. Its clean lines and timeless shape make it a stylish addition to any kitchen, dining table, or countertop. Made from high-quality PLA, this bowl is lightweight, sturdy, and easy to clean.",
      "fr": "Apportez une touche de modernité à votre cuisine avec le Bol de fruits Alder, un design élégant et aéré qui présente vos fruits frais de manière élégante tout en les gardant frais plus longtemps. Ses lignes nettes et sa forme intemporelle en font un ajout élégant à n'importe quelle cuisine, table à manger ou comptoir. Fabriqué à partir de PLA de haute qualité, ce bol est léger, solide et facile à nettoyer.",
      "nl": "De Alder Fruitschaal is een moderne schaal met een open en luchtig ontwerp, waardoor fruit mooi gepresenteerd wordt en langer vers blijft. De strakke lijnen en tijdloze vorm maken deze schaal tot een stijlvolle toevoeging aan je keuken, eettafel of aanrecht. Geprint in hoogwaardige PLA, is de fruitschaal licht, stev…"
    }
  },
  {
    "id": "vela-tissue-doos",
    "slug": "vela-tissue-doos",
    "price": 19.99,
    "category": "storage",
    "image": "/images/vela-tissue-doos.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "191 × 191 × 147 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Vela Tissue Box",
      "fr": "Boîte de tissues Vela",
      "nl": "Vela tissue doos"
    },
    "description": {
      "en": "Add a touch of sophistication to your home with the Vela Tissue Box, a stylish and serene cover designed to fit standard tissue boxes. Its modern design blends seamlessly into any room, from the living room to the bedroom or bathroom. Made from high-quality PLA, this cover is both durable and stylish.",
      "fr": "Ajoutez une touche de sophistication à votre domicile avec la Boîte de tissues Vela, un couvercle élégant et serein conçu pour les boîtes de tissues standard. Son design moderne se fond parfaitement dans n'importe quelle pièce, de la salle de séjour à la chambre ou à la salle de bain. Fabriqué à partir de PLA de haute qualité, ce couvercle est à la fois durable et élégant.",
      "nl": "De Vela Tissue Doos geeft standaard tissue dozen een stijlvolle en rustige uitstraling. Ontworpen voor vierkante tissue dozen, verbergt deze cover de originele verpakking en past hij perfect in een modern interieur, zowel in de woonkamer, slaapkamer als badkamer. De cover is geprint in hoogwaardige PLA, wat zorgt vo…"
    }
  },
  {
    "id": "vesa-fruitschaal",
    "slug": "vesa-fruitschaal",
    "price": 9.99,
    "category": "kitchen",
    "image": "/images/vesa-fruitschaal.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "229 × 233 × 73 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Vesa Fruit Bowl",
      "fr": "Bol de fruits Vesa",
      "nl": "Vesa fruitschaal"
    },
    "description": {
      "en": "Bring a touch of modernity to your kitchen with the Vesa Fruit Bowl, a sleek and airy design that beautifully showcases your fresh fruit while keeping it fresh for longer. Its clean lines and timeless shape make it a stylish addition to any kitchen, dining table, or countertop. Made from high-quality PLA, this bowl is lightweight, sturdy, and easy to clean.",
      "fr": "Apportez une touche de modernité à votre cuisine avec le Bol de fruits Vesa, un design élégant et aéré qui présente vos fruits frais de manière élégante tout en les gardant frais plus longtemps. Ses lignes nettes et sa forme intemporelle en font un ajout élégant à n'importe quelle cuisine, table à manger ou comptoir. Fabriqué à partir de PLA de haute qualité, ce bol est léger, solide et facile à nettoyer.",
      "nl": "De Vesa Fruitschaal is een moderne schaal met een open en luchtig ontwerp, waardoor fruit mooi gepresenteerd wordt en langer vers blijft. De strakke lijnen en tijdloze vorm maken deze schaal tot een stijlvolle toevoeging aan je keuken, eettafel of aanrecht. Geprint in hoogwaardige PLA, is de fruitschaal licht, stevi…"
    }
  },
  {
    "id": "taro-badkamer-organizer",
    "slug": "taro-badkamer-organizer",
    "price": 12.5,
    "category": "storage",
    "image": "/images/taro-badkamer-organizer.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "136 × 69 × 69 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Taro Bathroom Organizer",
      "fr": "Organisateur de salle de bain Taro",
      "nl": "Taro badkamer organizer"
    },
    "description": {
      "en": "Keep your bathroom tidy and organized with the Taro Bathroom Organizer. With space for toiletries, bottles, and accessories, this organizer maintains order without cluttering the space. Its sleek, minimalist design fits perfectly into modern and Scandinavian bathrooms. Made from high-quality PLA, this organizer is durable and easy to clean.",
      "fr": "Gardez votre salle de bain rangée et organisée avec l'Organisateur de salle de bain Taro. Avec de l'espace pour les produits de soins personnels, les bouteilles et les accessoires, cet organisateur maintient l'ordre sans encombrer l'espace. Son design élégant et minimaliste se fond parfaitement dans les salles de bain modernes et scandinaves. Fabriqué à partir de PLA de haute qualité, cet organisateur est durable et facile à nettoyer.",
      "nl": "De Taro Badkamer Organizer helpt je om je badkamer netjes en overzichtelijk te houden. Met ruimte voor verzorgingsproducten zoals flessen, tubes en accessoires zorgt deze organizer voor orde zonder dat het druk oogt. Het strakke, minimalistische ontwerp past perfect in moderne en Scandinavische badkamers. Geprint in…"
    }
  },
  {
    "id": "taro-tissue-doos",
    "slug": "taro-tissue-doos",
    "price": 9.99,
    "category": "storage",
    "image": "/images/taro-tissue-doos.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "140 × 129 × 149 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Taro Tissue Box",
      "fr": "Boîte de tissues Taro",
      "nl": "Taro tissue doos"
    },
    "description": {
      "en": "Elevate your home decor with the Taro Tissue Box, a stylish and serene cover designed to fit standard tissue boxes. Its modern design blends seamlessly into any room, from the living room to the bedroom or bathroom. Made from high-quality PLA, this cover is both durable and stylish.",
      "fr": "Élèvez votre décoration intérieure avec la Boîte de tissues Taro, un couvercle élégant et serein conçu pour les boîtes de tissues standard. Son design moderne se fond parfaitement dans n'importe quelle pièce, de la salle de séjour à la chambre ou à la salle de bain. Fabriqué à partir de PLA de haute qualité, ce couvercle est à la fois durable et élégant.",
      "nl": "De Taro Tissue Doos geeft standaard tissue dozen een stijlvolle en rustige uitstraling. Ontworpen voor vierkante tissue dozen, verbergt deze cover de originele verpakking en past hij perfect in een modern interieur, zowel in de woonkamer, slaapkamer als badkamer. De cover is geprint in hoogwaardige PLA, wat zorgt vo…"
    }
  },
  {
    "id": "ona-vaas",
    "slug": "ona-vaas",
    "price": 4.99,
    "category": "decor",
    "image": "/images/ona-vaas.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "70 × 70 × 175 mm",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Ona Vase",
      "fr": "Vase Ona",
      "nl": "Ona vaas"
    },
    "description": {
      "en": "Add a touch of elegance to your home with the Ona Vase, a modern and sophisticated design perfect for fresh or dried flowers. Its minimalist shape and clean lines make it a versatile addition to any interior, from modern to Scandinavian. Made from high-quality PLA, this vase is sturdy, durable, and easy to clean.",
      "fr": "Ajoutez une touche d'élégance à votre domicile avec le Vase Ona, un design moderne et sophistiqué parfait pour les fleurs fraîches ou séchées. Sa forme minimaliste et ses lignes nettes en font un ajout polyvalent à n'importe quel intérieur, du moderne au scandinave. Fabriqué à partir de PLA de haute qualité, ce vase est solide, durable et facile à nettoyer.",
      "nl": "De Ona vaas is een moderne vaas met een strak en elegant ontwerp, perfect voor zowel verse bloemen als droogbloemen. Dankzij de minimalistische vorm en rustige lijnen past deze vaas moeiteloos in elk interieur, van modern tot Scandinavisch. De vaas is geprint in hoogwaardige PLA, wat zorgt voor een stevige, duurzame…"
    }
  },
  {
    "id": "playbook-d-mancala",
    "slug": "playbook-d-mancala",
    "price": 19.99,
    "category": "games",
    "image": "/images/playbook-d-mancala.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Playbook'd Mancala",
      "fr": "Playbook'd Mancala",
      "nl": "Playbook'd Mancala"
    },
    "description": {
      "en": "Combine traditional gameplay with sleek design, perfect for families, game enthusiasts, and anyone looking to store games without clutter. Made from high-quality PLA, Playbook'd Mancala is sturdy, durable, and beautifully finished, making it an elegant decorative piece even when not in use.",
      "fr": "Allie le plaisir de jouer aux jeux classiques à un design élégant, idéal pour les familles, les amateurs de jeux et ceux qui veulent ranger leurs jeux sans les boîtes encombrantes. Imprimé en PLA de haute qualité, Playbook'd Mancala est solide, durable et fini avec soin, ce qui en fait une pièce décorative élégante même lorsqu'il n'est pas utilisé.",
      "nl": "Deze set combineert traditioneel spelplezier met strak design. Perfect voor gezinnen, spelletjesfans en iedereen die spellen wil bewaren zonder rommelige dozen. Geprint in hoogwaardige PLA, is Playbookd Mancala stevig, duurzaam en mooi afgewerkt. Ook wanneer het niet wordt gespeeld, is het een elegant decoratief obj…"
    }
  },
  {
    "id": "playbook-d-chess",
    "slug": "playbook-d-chess",
    "price": 39.99,
    "category": "games",
    "image": "/images/playbook-d-chess.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Playbook'd - Chess",
      "fr": "Playbook'd - Chess",
      "nl": "Playbook'd - Chess"
    },
    "description": {
      "en": "This cleverly designed chess set looks like a stylish book when closed, perfect for discreetly storing in a bookshelf. Open the 'book' to reveal a complete chessboard with matching pieces, neatly stored inside. This chess set combines timeless gameplay with modern design.",
      "fr": "Ce jeu d'échecs conçu avec intelligence ressemble à un livre élégant lorsqu'il est fermé, parfait pour le ranger discrètement dans une bibliothèque. Ouvrez le « livre » pour découvrir un échiquier complet avec des pièces correspondantes, rangées avec soin à l'intérieur. Ce jeu d'échecs allie un plaisir de jeu intemporel à un design moderne.",
      "nl": "Playbookd Chess is een slim ontworpen schaakset die eruitziet als een stijlvol boek wanneer hij gesloten is. Perfect om onopvallend in een boekenkast te plaatsen. Open het &ldquo;boek&rdquo; en je onthult een volledig schaakbord met bijpassende schaakstukken, netjes opgeborgen in het interieur. Deze schaakset combin…"
    }
  },
  {
    "id": "playbook-d-backgammon",
    "slug": "playbook-d-backgammon",
    "price": 12.5,
    "category": "games",
    "image": "/images/playbook-d-backgammon.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "PlayBook'd - Backgammon",
      "fr": "PlayBook'd - Backgammon",
      "nl": "PlayBook'd - Backgammon"
    },
    "description": {
      "en": "This set combines timeless gameplay with modern design, perfect for classic game enthusiasts who value a tidy and stylish interior. Made from high-quality PLA, Playbook'd Backgammon is sturdy, durable, and sleekly finished, making it a decorative piece even when not in use.",
      "fr": "Ce jeu combine le plaisir de jouer aux jeux classiques à un design moderne, idéal pour les amateurs de jeux qui apprécient également un intérieur rangé et élégant. Imprimé en PLA de haute qualité, Playbook'd Backgammon est solide, durable et fini avec soin, ce qui en fait une pièce décorative même lorsqu'il n'est pas utilisé.",
      "nl": "Deze set combineert tijdloos spelplezier met modern design. Perfect voor liefhebbers van klassieke spellen die ook waarde hechten aan een opgeruimd en stijlvol interieur. Geprint in hoogwaardige PLA, is Playbookd Backgammon stevig, duurzaam en strak afgewerkt. Ook wanneer het spel niet wordt gebruikt, is het een dec…"
    }
  },
  {
    "id": "playbook-d-zeeslag",
    "slug": "playbook-d-zeeslag",
    "price": 29.99,
    "category": "games",
    "image": "/images/playbook-d-zeeslag.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Playbook'd - Zeeslag",
      "fr": "Playbook'd - Zeeslag",
      "nl": "Playbook'd - Zeeslag"
    },
    "description": {
      "en": "No description available",
      "fr": "Pas de description disponible",
      "nl": ""
    }
  },
  {
    "id": "playbook-d-four-in-a-row",
    "slug": "playbook-d-four-in-a-row",
    "price": 17.5,
    "category": "games",
    "image": "/images/playbook-d-four-in-a-row.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Playbook'd - Four in a Row",
      "fr": "Playbook'd - Four in a Row",
      "nl": "Playbook'd - Four in a Row"
    },
    "description": {
      "en": "Playbook'd Four in a Row is a modern take on the classic game, packaged in a stylish 'book'. Closed, it fits perfectly on your bookshelf or shelf, and when opened, you have a complete game board with matching tokens, neatly stored and ready to play. This set combines modern design with classic gameplay.",
      "fr": "Playbook'd Four in a Row est une version moderne du jeu classique, présenté dans un « livre » élégant. Fermé, il trouve sa place parfaite sur votre étagère ou dans votre bibliothèque, et une fois ouvert, vous avez un plateau de jeu complet avec des jetons correspondants, rangés avec soin et prêts à jouer. Ce jeu allie un design moderne à un plaisir de jeu classique.",
      "nl": "Playbookd Four in a Row is een moderne uitvoering van het klassieke spel Vier op een Rij, verpakt in een stijlvol &ldquo;boek&rdquo;. Gesloten past het perfect in je boekenkast of op een plank, en opengeklapt heb je een volledig speelbord met bijbehorende fiches, overzichtelijk opgeborgen en direct speelbaar. Deze s…"
    }
  },
  {
    "id": "vlinder-magneten-set-van-3",
    "slug": "vlinder-magneten-set-van-3",
    "price": 2.99,
    "category": "kitchen",
    "image": "/images/vlinder-magneten-set-van-3.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "Vlinder Magnets (set of 3)",
      "fr": "Vlinder Aimants (lot de 3)",
      "nl": "Vlinder magneten (set van 3)"
    },
    "description": {
      "en": "Add a playful touch to your kitchen with the Butterfly Fridge Magnets. These colorful magnets in the shape of butterflies are perfect for attaching notes, shopping lists, or photos to your fridge, whiteboard, or metal surface. Made from high-quality PLA, the magnets are sturdy, durable, and beautifully finished.",
      "fr": "Ajoutez une touche ludique à votre cuisine avec les aimants frigo en forme de papillons. Ces aimants colorés sont parfaits pour attacher des notes, des listes de courses ou des photos à votre réfrigérateur, votre tableau blanc ou votre surface métallique. Imprimés en PLA de haute qualité, les aimants sont solides, durables et finis avec soin.",
      "nl": "Breng een speels accent aan je keuken met de Butterfly Fridge Magnets. Deze kleurrijke magneetjes in de vorm van vlinders zijn perfect om notities, boodschappenlijstjes of foto&rsquo;s op je koelkast, whiteboard of metalen oppervlak te bevestigen. Geprint in hoogwaardige PLA, zijn de magneetjes stevig, duurzaam en k…"
    }
  },
  {
    "id": "playbook-d-hangman",
    "slug": "playbook-d-hangman",
    "price": 24.99,
    "category": "games",
    "image": "/images/playbook-d-hangman.png",
    "badge": null,
    "stock": 20,
    "material": {
      "en": "PLA",
      "fr": "PLA",
      "nl": "PLA"
    },
    "dimensions": "",
    "layerHeight": "0.20 mm",
    "finishing": {
      "en": "Matte",
      "fr": "Mat",
      "nl": "Mat"
    },
    "name": {
      "en": "PlayBook'd - Hangman",
      "fr": "PlayBook'd - Hangman",
      "nl": "PlayBook'd - Hangman"
    },
    "description": {
      "en": "Playbook'd Hangman brings the classic guessing game into a sleek and modern design. When closed, it looks like a stylish book that fits perfectly on your bookshelf or shelf. Open the book to reveal a complete word game, neatly stored and ready to play. This version combines modern design with classic gameplay.",
      "fr": "Playbook'd Hangman présente le jeu de devinette classique dans un design élégant et moderne. Lorsqu'il est fermé, il ressemble à un livre élégant qui trouve sa place parfaite sur votre étagère ou dans votre bibliothèque. Ouvrez le livre pour découvrir un jeu de mots complet, rangé avec soin et prêt à jouer. Cette version allie un design moderne à un plaisir de jeu classique.",
      "nl": "Playbookd Hangman brengt het bekende galgje-spel in een strak en modern jasje. Wanneer het spel gesloten is, lijkt het op een stijlvol boek dat perfect past in je boekenkast of op een plank. Open het boek en je hebt een compleet woordspel, overzichtelijk opgeborgen en direct klaar om te spelen. Deze uitvoering combi…"
    }
  }
];
