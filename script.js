window.onload = mycode;
function mycode () {

    var hero = {
        x: 700,
        y: 500
    }
    
    var enemies = []
    
    function enemiesDeployment () {
        for ( var i = 0; i < 10; i++) {
            enemies.push ( {
                x: Math.random () * 1000,
                y: Math.random () * 100,
                s: 2 + Math.random () * .5
            } )
        }
    }
    enemiesDeployment ();
    console.log ( enemies );

    var bullets = [];
    var score = 0;
    var offsetEnemies = 14;
    var offsetBullets = 9;


    function displayHero () {
        document.getElementById( 'hero' ).style[ 'left' ] = hero.x + "px";
        document.getElementById( "hero" ).style[ "top" ] = hero.y + "px";
    }

    function displayEnemies () {
        var output = "";
        for (var i = 0; i < enemies.length; i++) {
            output += "<div class='enemy1' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
        }
        document.getElementById( "enemies" ).innerHTML = output;
    }

    function displayBullets () {
        var output = "";
        for (var i = 0; i < bullets.length; i++) {
            output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
        }
        document.getElementById( "bullets" ).innerHTML = output;
    }
    
    function displayScore () {
        document.getElementById( "score" ).innerHTML = score;
    }

    // function displayIndicator () {
    //     var output = "";
    //     for (var i = 0; i < enemies.length; i++) {
    //         output += "<div class='indicators' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
    //     }
    //     document.getElementById( "indicator" ).innerHTML = output;
    // }
    
    function moveEnemies () {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].y += enemies[i].s;
            if ( enemies[i].y > 800) {
                enemies[i].y = 0;
                enemies[i].x = Math.random () * 1000;
                enemies[i].s = 2 + Math.random () * .5;
            }
        }
    }
    
    function moveBullets () {
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].y -= 2;
            if ( bullets[i].y < 0 ) {
                bullets[i] = bullets[bullets.length - 1];
                bullets.pop ();
            }
            // console.log ( bullets );
        }
    }
    
    function gameLoop () {
        displayHero ();
        moveEnemies ();
        displayEnemies ();
        // displayIndicator ();
        moveBullets ();
        displayBullets ();
        detectCollision ();
        displayScore ();
    }

    setInterval( gameLoop, 15 );

    function detectCollision () {
        for (var i = 0; i < bullets.length; i++) {
            for (var j = 0; j < enemies.length; j++) {
                if( Math.abs( (bullets[i].x + offsetBullets ) - (enemies [j].x + offsetEnemies)) < 5 && Math.abs( (bullets[i].y - offsetBullets) - (enemies [j].y - offsetEnemies)) < 6 ) {
                    score += 10;
                    console.log ( "hit! " );
                    console.log ( 'bullet', i, 'hit enemy', j);
                }
            }
        }
    }

    document.onkeydown = function(a) {
        if ( a.keyCode == 37 ){
            hero.x -= 10;
        }
        if ( a.keyCode == 39 ) {
            hero.x += 10;
        }
        if ( a.keyCode == 38 ) {
            hero.y -= 10;
        }
        if ( a.keyCode == 40 ) {
            hero.y += 10;
        }
        if ( a.keyCode == 32 ) { //spacebar
            bullets.push ({x: hero.x + 6, y: hero.y - 13 });
            // displayBullets ();
        }
        displayHero ();
    }
}