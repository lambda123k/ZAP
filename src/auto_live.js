/*ZAPPEUR-CATALOGUE-AUTO:START*/
// Bloc mis à jour chaque semaine par la tâche planifiée. Format d'une ligne :
// [titre, plateforme (netflix|disney|crunchy|canal|prime|apple), format (film|serie|anime), [genres], durée en min (film) ou par épisode,
//  attention 1-3, [ambiances], {nw:"AAAA-MM-JJ" (date d'ajout), big:1 si spectacle visuel, a:1 si animation non-anime}]
const CATALOGUE_MAJ = "2026-10-12";
const AUTO = [
 ["Demon Slayer : La Forteresse Infinie","netflix","film",["action","fantasy"],155,2,["epic"],{nw:"2026-09-29",anime:1,big:1}],
 ["Unabomber","netflix","film",["thriller","policier","drame"],107,2,["frisson","reflexion"],{nw:"2026-09-29"}],
 ["JoJo's Bizarre Adventure : Steel Ball Run","netflix","anime",["action","aventure"],24,2,["epic"],{nw:"2026-09-29"}],
 ["American Horror Story","disney","serie",["horreur","thriller"],45,2,["frisson"],{nw:"2026-09-29"}],
 ["The Drop : une saga Snowfall","disney","serie",["drame","policier"],50,3,["frisson","reflexion"],{nw:"2026-09-29"}],
 ["The Love Hypothesis","prime","film",["romance","comedie"],112,1,["romance","feel","rire"],{nw:"2026-09-29"}],
 ["Until Dawn","prime","film",["horreur"],103,2,["frisson"],{nw:"2026-09-29"}],
 ["Brothers","apple","serie",["comedie"],30,1,["rire"],{nw:"2026-09-29"}],
 ["Hurlevent","canal","film",["romance","drame","historique"],136,2,["romance","reflexion"],{nw:"2026-09-29"}],
 ["Nuremberg","canal","film",["historique","drame"],148,3,["reflexion"],{nw:"2026-09-29"}],
 ["Overgeared","crunchy","anime",["action","fantasy"],24,2,["epic"],{nw:"2026-09-29"}],
 ["Mononoké, chapitre III : La Malédiction du serpent","netflix","film",["horreur","fantasy","historique"],87,2,["frisson"],{nw:"2026-09-29",anime:1}],
 ["Le Problème final","netflix","serie",["policier","thriller","historique"],45,2,["frisson","reflexion"],{nw:"2026-09-29"}],
 ["À l'est d'Éden","netflix","serie",["drame","historique","romance"],60,3,["reflexion","romance"],{nw:"2026-10-05",age:16,res:"En Californie, au tournant du XXe siècle, une femme farouchement indépendante sème la discorde entre deux frères et déclenche une saga familiale sur plusieurs générations. Florence Pugh porte cette mini-série en 7 épisodes adaptée du grand roman de John Steinbeck."}],
 ["Jurassic World : Renaissance","netflix","film",["aventure","action","sf"],134,1,["epic","frisson"],{nw:"2026-10-05",age:12,big:1,res:"Une équipe menée par Scarlett Johansson part sur l'île la plus dangereuse jamais créée par le premier Jurassic Park pour récupérer de l'ADN de dinosaures à des fins médicales. La mission tourne vite à la chasse pour survivre, entre créatures hybrides oubliées et secrets enfouis dans la jungle."}],
 ["L'Accident de piano","netflix","film",["comedie","thriller"],88,2,["rire","frisson"],{nw:"2026-10-05",age:12,res:"Magalie, star du web insensible à la douleur, s'est enrichie avec des vidéos extrêmes jusqu'au jour où un tournage tourne au drame. Réfugiée dans un chalet avec son assistant, elle doit faire face à une journaliste qui la fait chanter : une comédie absurde et grinçante de Quentin Dupieux, avec Adèle Exarchopoulos."}],
 ["Blue Box","netflix","anime",["romance","sport","comedie"],24,1,["romance","cosy","feel"],{nw:"2026-10-05",age:10,res:"Taiki, jeune joueur de badminton, est secrètement amoureux de Chinatsu, la star de l'équipe de basket, qui vient vivre sous le même toit que lui. Une romance lycéenne lumineuse sur le sport et les premiers sentiments, dont la saison 2 sort un épisode chaque dimanche."}],
 ["Mayor of Kingstown","netflix","serie",["policier","drame","thriller"],50,3,["frisson","reflexion"],{nw:"2026-10-05",age:16,res:"À Kingstown, ville du Michigan qui vit de ses prisons, la famille McLusky sert d'intermédiaire entre policiers, gangs, détenus et politiques. Jeremy Renner incarne Mike, l'homme qui tente de maintenir un équilibre de plus en plus fragile, dans ce polar brutal de Taylor Sheridan (saisons 1 à 4)."}],
 ["Black Clover","crunchy","anime",["action","fantasy","aventure"],24,1,["epic","feel"],{nw:"2026-10-05",age:12,res:"Dans un monde où tout le monde maîtrise la magie, Asta, né sans le moindre pouvoir, rêve pourtant de devenir l'Empereur-Mage. Après des années d'attente, la saison 2 relance l'aventure avec l'offensive des mages contre le royaume de Spade."}],
 ["Tokyo Revengers","disney","anime",["action","drame","sf"],24,2,["epic","frisson"],{nw:"2026-10-05",age:16,res:"Takemichi remonte le temps pour sauver ceux qu'il aime des gangs de Tokyo. Dans l'arc final, la Guerre des Trois Titans, trois forces rivales se disputent la ville et il doit affronter son ancien ami Mikey."}],
 ["Le Hobbit : un voyage inattendu","prime","film",["fantasy","aventure"],169,2,["epic"],{nw:"2026-10-05",age:10,big:1,res:"Le paisible hobbit Bilbon Sacquet est entraîné par le magicien Gandalf et treize nains dans une quête pour reprendre leur royaume, gardé par le dragon Smaug. Le début de la trilogie de Peter Jackson en Terre du Milieu, avec les deux suites également disponibles."}],
 ["Below","netflix","serie",["horreur","thriller","drame"],45,2,["frisson"],{nw:"2026-10-12",age:16,res:"Sur une île de Terre-Neuve, un pêcheur encore hanté par la mort inexpliquée de son père fait équipe avec une océanographe quand une créature venue des profondeurs sème la terreur sur la côte. Une mini-série de 6 épisodes entre horreur et légende locale, avec Josh Hartnett, Mackenzie Davis et Charlie Heaton."}],
 ["My Hero Academia : Vigilantes","netflix","anime",["action","fantasy","comedie"],24,1,["epic","feel"],{nw:"2026-10-12",age:12,res:"Cinq ans avant l'histoire de Deku, Koichi, étudiant ordinaire qui a renoncé à devenir héros, fait équipe avec la danseuse de rue Pop☆Step et le mystérieux justicier Knuckleduster. Ensemble, ils combattent dans l'ombre les crimes de quartier que les héros officiels ignorent (saisons 1 et 2)."}],
 ["Carrie","prime","serie",["horreur","drame","fantasy"],55,2,["frisson","reflexion"],{nw:"2026-10-12",age:16,res:"Élevée par une mère très pieuse, la discrète Carrie White fait sa rentrée dans un lycée public où le harcèlement se propage sur les réseaux, et découvre peu à peu qu'elle a des pouvoirs télékinésiques. Mike Flanagan réinvente le roman de Stephen King en mini-série de 8 épisodes."}],
 ["Hamnet","canal","film",["drame","historique","romance"],125,3,["reflexion","romance"],{nw:"2026-10-12",age:0,res:"Dans l'Angleterre de la fin du XVIe siècle, Agnes et William Shakespeare voient leur vie bouleversée par la perte de leur fils Hamnet, jusqu'à la naissance de Hamlet. Chloé Zhao adapte le roman de Maggie O'Farrell, porté par Jessie Buckley et Paul Mescal."}],
 ["Matchbox, le film","apple","film",["action","aventure","comedie"],126,1,["epic","rire"],{nw:"2026-10-12",age:10,big:1,res:"Sean, agent de la CIA joué par John Cena, revient dans sa ville natale et entraîne ses amis d'enfance dans une course-poursuite à travers le monde pour sauver la planète. Un film d'action familial inspiré des célèbres petites voitures, avec Jessica Biel."}],
 ["Small Prophets","apple","serie",["comedie","drame","fantasy"],30,1,["cosy","feel","rire"],{nw:"2026-10-12",age:12,res:"Sept ans après la disparition de sa bien-aimée Clea, l'excentrique Michael Sleep, vendeur dans un magasin de bricolage, suit une vieille recette d'alchimie pour créer des homoncules capables de prédire l'avenir. Une comédie douce-amère de Mackenzie Crook en 6 épisodes, avec Michael Palin."}],
 ["Les Noces des lucioles","crunchy","anime",["romance","historique","drame"],24,2,["romance","frisson"],{nw:"2026-10-12",age:12,res:"À l'ère Meiji, Satoko, fille de bonne famille à qui il reste peu de temps à vivre, veut se marier pour l'honneur des siens. Quand un assassin tente de la tuer, elle lui propose de l'épouser : une union faite de faux-semblants et de danger, avec un épisode chaque vendredi."}]
];
// Titres partis de leur plateforme (noms exacts) : ils ne sont plus proposés.
const RETIRES = [
 "Death Note"
];
// Suites annoncées (mis à jour chaque semaine) : "titre exact du catalogue": {txt:"phrase courte", st:"dispo" si la nouvelle saison est déjà sortie sinon "annonce", maj:"AAAA-MM-JJ" date de l'info}
const SUITES = {
 "Les Carnets de l'apothicaire":{txt:"Saison 3 en cours de diffusion sur Crunchyroll depuis le 2 octobre 2026",st:"dispo",maj:"2026-10-02"},
 "Frieren":{txt:"Saison 3 prévue en octobre 2027",st:"annonce",maj:"2026-10-11"},
 "Dan Da Dan":{txt:"Saison 3 prévue en 2027",st:"annonce",maj:"2025-12-18"},
 "One Piece (live action)":{txt:"Saison 3 prévue en 2027 (arc Alabasta)",st:"annonce",maj:"2026-08-26"},
 "Mercredi":{txt:"Saison 3 confirmée, pas avant 2027",st:"annonce",maj:"2025-08-18"},
 "Fallout":{txt:"Saison 3 confirmée, tournée en 2026 ; date pas encore annoncée",st:"annonce",maj:"2026-08-24"},
 "Severance":{txt:"Saison 3 confirmée ; date pas encore annoncée",st:"annonce",maj:"2026-10-11"},
 "Solo Leveling":{txt:"Saison 3 confirmée ; date pas encore annoncée",st:"annonce",maj:"2026-10-11"},
 "Lupin":{txt:"Saison 4 (partie 4) le 23 octobre 2026 sur Netflix",st:"annonce",maj:"2026-06-09"},
 "Cyberpunk: Edgerunners":{txt:"Saison 2 le 20 octobre 2026 sur Netflix",st:"annonce",maj:"2026-08-21"},
 "Emily in Paris":{txt:"Saison 6, la dernière, le 24 décembre 2026",st:"annonce",maj:"2026-08-26"},
 "Blue Eye Samurai":{txt:"Saison 2 prévue en janvier 2027 ; date exacte pas encore annoncée",st:"annonce",maj:"2026-08-20"}
};
/*ZAPPEUR-CATALOGUE-AUTO:END*/
