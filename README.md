# memory

Création d'un petit mémory en vanilla JS
Utilisation du localStorage pour enregistrer un classement

Règles spéciales : 
- Si on dévoile le lama en 1ere carte, puis le gorille en 2eme carte, on annule les 2 premières paires trouvées de la partie, qui redeviennent cachées (maximum).
- Si on dévoile l'écureuil en 1ere carte, puis le poney en 2eme carte, on dévoile une girafe (si possible)
- Si on dévoile le kangourou en 1ere carte, puis le lémurien en 2eme carte, toutes les cartes sont dévoilées pendant 2 secondes, puis re-cachées (celles qui l'étaient), puis la règle ne s'applique plus.

Oeuf de paques:
- Si on clique 5 fois d'affilée sur une carte cachée (n'importe laquelle), on écrit dans la console développeur : "We <3 Rémy"
