# Data dictionary

## Questions

|Field|Type|Specificity|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|Question ID|
|question|VARCHAR(128)|NOT NULL|Question|
|picture|VARCHAR(128)|NULL|Question picture URL|
|id_proposition|INT, Foreign_KEY, UNSIGNED|NOT NULL|Proposition ID|
|id_category|INT|NOT NULL|id of categories questions|
|id_difficulty|INT|NOT NULL|id of questions difficulty |
|answer|VARCHAR(64)|NOT NULL|true answers|
|trivia|VARCHAR(64)|NOT NULL|description of the answers|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|Creation date|
|updated_at|TIMESTAMP|NULL|Question update date|

## Propositions 
|Field|Type|Specificity|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|L'identifiant de notre reponse|
|answers1|VARCHAR(128)|NOT NULL|Answer 1|
|pictureAnswers1|VARCHAR(128)|NOT NULL|Answer 1 picture URL|
|answers2|VARCHAR(128)|NOT NULL|Answer 2|
|pictureAnswers2|VARCHAR(128)|NOT NULL|Answer 2 picture URL|
|answers3|VARCHAR(128)|NOT NULL|Answer 3|
|pictureAnswers3|VARCHAR(128)|NOT NULL|Answer 3 picture URL|
|answers4|VARCHAR(128)|NOT NULL|Answer 4|
|pictureAnswers4|VARCHAR(128)|NOT NULL|Answer 4 picture URL|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|creation date|
|updated_at|TIMESTAMP|NULL|update date|

## Categories
|Field|Type|Specificity|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|Category ID|
|name|VARCHAR(64)|NOT NULL|Category name|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|Creation date|
|updated_at|TIMESTAMP|NULL|update date|

## Difficulty
|Field|Type|Specificity|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|Difficulty ID|
|name|VARCHAR(64)|NOT NULL|Difficulty name|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|creation date|
|updated_at|TIMESTAMP|NULL|update date|

## users
|Field|Type|Specificity|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|User ID|
|nickname|VARCHAR(64)|NOT NULL|User nickname|
|email|VARCHAR(64)|NOT NULL|User email|
|password|VARCHAR(64)|NOT NULL|User password|
|avatar|VARCHAR(128)|NULL|User avatar|
|level|INT|NOT NULL|level user|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|creation date|
|updated_at|TIMESTAMP|NULL|update date|

----

### Attention V2 

## trophies
|Field|Type|Specificity|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNSIGNED|Trophy ID|
|name|VARCHAR(64)|NOT NULL|trophy name|
|description|VARCHAR(128)|NOT NULL|trophy description|
|picture|VARCHAR(128)|NOT NULL|trophy picture URL|
|level|INT|NOT NULL|trophy level|
|created_at|TIMESTAMP|NOT NULL DEFAULT CURRENT_TIMESTAMP|creation date|
|updated_at|TIMESTAMP|NULL|update date|

## link trophy/user
|Field|Type|Specificity|Description|
|-|-|-|-|
|id_trophy|INT|NOT NULL|id of trophy|
|id_user|INT|NOT NULL|id of user|

