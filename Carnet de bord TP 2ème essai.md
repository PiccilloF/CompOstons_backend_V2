<h1> Carnet de bord TP 2ème essai</h1>



<h2>Feedback du Jury TP de février</h2>

### 

**Côté back**, le jury a trouvé le projet insuffisant pour montrer que tu maîtrises le sujet. Il te conseille de refaire le projet avec une base  de données, d’au moins quatre tables, avec différentes cardinalités.

**Côté front**, attention aux connaissances de certaines balises.
	Attention à la gestion du timing, ta présentation était un peu trop longue. Il est conseillé de s’entraîner en se chronométrant.
	Enfin, le jury a eu l’impression que tu es passé à côté du SCSS et de ses capacités. Tu peux revoir cette notion.

*Le jury te conseille de réviser les bases de données et le MCD et les  cardinalités, car tu lui as semblé ne pas être au point sur le sujet.*



<h3>Objectif, modification de BDD</h3>

Pour le passage de la CCP  Back, la base de données a dû être modifiée car trop simpliste. 

Conception d'une nouvelle base de données intégrant de nouvelles tables:

- Articles: pour dynamiser les publications
- Déchets: pour catégoriser les types de déchets et ne pas les laisser en dur en vue de futur ajouts ou modifications
- Association OneToMany entre les tables Utilisateur et Compost:
  - Un Utilisateur peux posséder plusieurs Composts (différentes localisations), 
  - un compost est la propriété d'un utilisateur.
  

- Association OneToMany entre les tables Utilisateur et Article:
  - Un Utilisateur peut rédiger plusieurs articles.
  - Un article possède obligatoirement un auteur Unique.

- Association ManyToMany entre les tables Compost et catégorie de déchets:

  - Un Compost peut comporter plusieurs catégories de déchets.
  - Une catégorie de déchets dépend peut appartenir à plusieurs composts:
  - Création d'une table d'association.

    | Catégorie de déchet                                    | Catégorie opposée à mélanger           |
    | ------------------------------------------------------ | -------------------------------------- |
    | **Humides ** (contient de l'eau, jus, mauvaise odeur ) | **Secs** (seuls, ne se compostent pas) |
    | Tontes de gazon, déchets de cuisine                    | Paille, sciure                         |
    | **Carbonés** (compostage lent)                         | **Azotés** (pourrissent facilement)    |
    | Paille, écorces, sciure, feuilles                      | Déchets de cuisine, tonte de gazon     |
    | **Grossiers** (aération)                               | **Fins** (empêche le passage d'air)    |
    | Tailles et déchets fibreux broyés                      | Sciure, déchets de cuisine, tontes     |

    

    - Tontes de gazon = déchets humides et azotés.

    - Déchets de cuisine = déchets humides / fins et azotés.

    - Paille, papiers = déchets secs et carbonés.

    - Branches = déchets secs / grossiers et carbonés.




<h3>Premières modifications</h3>

<h4>BDD</h4>

Refonte du MCD, relation entre un <b>Compost</b> et une catégorie de <b>déchets</b> mal interprétée. Une categorie de déchets peut appartenir à plusieurs Compost et réciproquement, un Compost peut posséder plusieurs catégories de déchêts.

Modification de la releation <b> OneToMany</b> en <b>ManyToMany</b> et ajout d'une table d'association <b>compost_has_waste</b>.