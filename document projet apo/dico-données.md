# Dictionnaire de données

## Questions (`questions`)

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|L'identifiant de notre question|
|question|VARCHAR(128)|NOT NULL|La question|
|picture|VARCHAR(128)|NULL|Photo pour la question|
|answers1|VARCHAR(128)|NOT NULL|la reponse n°1|
|imgAnswers1|VARCHAR(128)|NOT NULL|une image pour la réponse n°1|
|answers2|VARCHAR(128)|NOT NULL|la reponse n°2|
|imgAnswers2|VARCHAR(128)|NOT NULL|une image pour la réponse n°2|
|answers3|VARCHAR(128)|NOT NULL|la reponse n°3|
|imgAnswers3|VARCHAR(128)|NOT NULL|une image pour la réponse n°3|
|answers4|VARCHAR(128)|NOT NULL|la reponse n°4|
|imgAnswers4|VARCHAR(128)|NOT NULL|une image pour la réponse n°4|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|date de création de la question|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour du produit|
|category|entity|NOT NULL|La catégorie de la question|
|difficulty|entity|NOT NULL|La difficulté de la question|

## Responses (`responses`)
|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|L'identifiant de notre reponse|
|name|VARCHAR(128)|NOT NULL|la reponse|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|date de création de la question|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour du produit|

## Liaison Q/R
|id_question|INT|NOT NULL|l'id de notre question|
|id_response|INT|NOT NULL|l'id de la bonne reponse|

## Category
|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|L'identifiant de la categorie|
|name|VARCHAR(64)|NOT NULL|Le nom de la category|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|date de création de la question|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour du produit|

## users
|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|L'identifiant du joueur|
|pseudo|VARCHAR(64)|NOT NULL|le pseudo du joueur|
|email|VARCHAR(64)|NOT NULL|l'email du joueur|
|password|VARCHAR(64)|NOT NULL|le password du joueur|
|points|INT|NOT NULL|le nombre de point cumulé|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|date de création de la question|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour du produit|
|avatar|VARCHAR(128)|NULL|l'avatar du joueur|