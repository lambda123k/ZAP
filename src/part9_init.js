/* ---------- démarrage ---------- */
buildCatalog();
save();
renderAll();
showTab(TAB); showView("sugg"); showJV("list");
checkBadges(true);
if(!S.me.name) openWelcome(1);
