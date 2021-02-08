| URL | Méthode HTTP | Controller | Méthode | Titre | Contenu | Commentaire |
|-|-|-|-|-|-|-|
|`/`|`GET`|-|`home`|Page d'accueil|Un bouton pour lancer l'appli|-|
|`mapquiz/`|`GET`|-|`mapquiz`|#côté map#|une map clickable avec : un menu, des questions, des infos, ... |
|`planetquiz/`|`GET`|-|`planetquiz`|#côté planète#|des planetes clickable avec : un menu, des questions, des infos, ... |
|`subscribe/`|`GET`|-|`inscription`|#inscription#|une page pour s'incrire |
|`subscribe/add`|`POST`|-|`inscription`|#inscription#|l'envois du formulaire |
|`subscribe/remove`|`DELETE`|-|`desinscription`|#desinscription#|désincrire formulaire |
|`faire-connaissance/`|`GET`|-|`faire connaissance`|#faire connaissance#|une page pour nous connaître et connaître le projet |
|`mentions-légales/`|`GET`|-|`les mentions légales`|#mentions légales#|pages des mentions légales |
|`donnees-personnelles/`|`GET`|-|`les données personnelles`|#les données personnelles#|pages d'infos sur les donéées personnelles et leur utilisation |
|`user/connexion`|`POST`|-|`se connecter`|#se connecter#|envois des données de connections id et email et password |
|`user/[id]`|`GET`|-|`page user`|#page user#|mes données de connexion |
|`user/[id]`|`PATCH`|-|`page user`|#page user#|modification du compte user |
|`404/`|`GET`|-|`404`|#404#|pages 404 erreur et bouton de retour dans le homme |

----

| URL | Méthode HTTP | Controller | Méthode | Titre | Contenu | Commentaire |
|-|-|-|-|-|-|-|
|`mapquiz/difficulty/category`|`GET`|-|`mapquiz`|#côté map#|des questions en fonctions de la difficultée choisit et de la category clické |
|`planetquiz/difficulty/category`|`GET`|-|`planetquiz`|#côté map#|des questions en fonctions de la difficultée choisit et de la category clické |