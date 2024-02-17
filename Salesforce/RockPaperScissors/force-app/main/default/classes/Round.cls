public with sharing class Round {
    public Round() {
        
    }
    @AuraEnabled /*Método que inserta una ronda en la base de datos. 
    Espera recibir el int con el número de ronda, el string con el jugador que es y su elección */
    public static Void insertRound(Integer round, String playerNumber, String playerChoice){
        Account acc = new Account(Name = 'Round'+round+playerChoice, NumberOfEmployees = round, BillingCountry = playerNumber, BillingCity = playerChoice);
        insert acc;
    }

    @AuraEnabled /*Método que obtiene el ganador de la ronda.*/
    public static void getWinner(){
        Integer lastRound = getRound() -1; //Se obtiene el número de la ronda anterior.
        Integer lastPlayer = getPlayer(); //Se obtiene el número del jugador que jugó la ronda anterior.
        
        try {
            List<Account> reqPlayer1 = [SELECT NumberOfEmployees, BillingCountry, BillingCity From Account 
                                            WHERE NumberOfEmployees <= :lastRound AND BillingCountry = '1' 
                                            ORDER BY NumberOfEmployees ASC];
            List<Account> reqPlayer2 = [SELECT NumberOfEmployees, BillingCountry, BillingCity From Account 
                                            WHERE NumberOfEmployees <= :lastRound AND BillingCountry = '2' 
                                            ORDER BY NumberOfEmployees ASC];
            
            if (reqPlayer1.size() == reqPlayer2.size()){
                for (Integer i = 0; i < reqPlayer1.size(); i++){
                    String player1Choice = reqPlayer1[i].BillingCity;
                    String player2Choice = reqPlayer2[i].BillingCity;

                    Integer winner = rockPaperScissors(player1Choice, player2Choice);
                    
                    Account player1Round = [SELECT Id 
                                                FROM Account 
                                                WHERE NumberOfEmployees = :i+1 AND BillingCountry = '1'];
                    Account player2Round = [SELECT Id 
                                                FROM Account 
                                                WHERE NumberOfEmployees = :i+1 AND BillingCountry = '2'];
                    Integer round = i+1;
                    /*Se actualiza el campo BillingStreet de las rondas con el ganador y la elección de cada jugador.*/
                    player1Round.BillingStreet = 'Round ' + round + ' Winner Player' + winner + ' Choice: ' + player1Choice;
                    player2Round.BillingStreet = 'Round ' + round + ' Winner Player' + winner + ' Choice: ' + player2Choice;
                    update player1Round;
                    update player2Round;
                }
            } 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*Método que recibe las elecciones de los jugadores y devuelve el ganador de la ronda.*/
    public static Integer rockPaperScissors(String player1, String player2) {
        if (player1 == player2) return 0;
        Map<String, String> winmap = new Map<String, String>{
            'Rock' => 'Paper',
            'Paper' => 'Scissors',
            'Scissors' => 'Rock'
        };
        System.debug('player1: '+ player1 + ' player2: '+ player2);
        System.debug('player1winmap: '+ winmap.get(player1) + ' player2: '+ player2);
        System.debug('player1: '+ winmap.get(player1).charAt(0) + ' player2: '+ player2.charAt(0));
        if (winmap.get(player1) == player2){
            return 2;
        } 
        else {
            return 1;
        }
        // System.debug(logLevel, o);
        // System.debug('player1: ' + player1);
        // System.debug('player2: ' + player2);
        // if (player1 == player2) return 0;    
        // if (player1 == 'Rock' && player2 == 'Paper') return 2;    
        // if (player1 == 'Rock' && player2 == 'Scissors') return 1;    
        // if (player1 == 'Paper' && player2 == 'Rock') return 1;    
        // if (player1 == 'Paper' && player2 == 'Scissors') return 2;    
        // if (player1 == 'Scissors' && player2 == 'Rock') return 2;    
        // if (player1 == 'Scissors' && player2 == 'Paper') return 1;    
        // return 0;
    }

    @AuraEnabled /*Método que elimina todas las rondas de la base de datos.*/
    public static Void resetScores(){
        List<Account> accounts = [SELECT Id 
                                    FROM Account 
                                    WHERE NumberOfEmployees > 0];
        delete accounts;
    }

    @AuraEnabled /*Método que obtiene las rondas de la base de datos.*/
    public static List<Account> getListScores(){
        try {
            Account[] accounts = [SELECT NumberOfEmployees, BillingCountry, BillingCity, BillingStreet 
                                    FROM Account 
                                    ORDER BY NumberOfEmployees, BillingCountry 
                                    ASC LIMIT 10];
            return accounts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled /*Método que obtiene el número de la ronda actual.*/
    public static Integer getRound(){
        List<aggregateResult> lastRound;
        try {
            lastRound = [SELECT NumberOfEmployees 
                            FROM Account 
                            GROUP BY NumberOfEmployees HAVING count(NumberOfEmployees) > 1 
                            ORDER BY NumberOfEmployees DESC LIMIT 1];

            if (lastRound.size() == 0){
                return 1;
            }
            return (Integer)lastRound[0].get('NumberOfEmployees') + 1;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled /*Método que obtiene el número de jugador que le toca jugar la ronda actual.*/
    public static Integer getPlayer(){
        List<aggregateResult> req;
        Integer thisRoundPlayers;
        Integer lastRound = getRound();
        try {
            req = [SELECT COUNT(BillingCountry) 
                    FROM Account 
                    WHERE NumberOfEmployees = :lastRound 
                    GROUP BY NumberOfEmployees];
            if (req.size() == 0){
                return 1;
            }
            thisRoundPlayers = (Integer)req[0].get('expr0');
            if (thisRoundPlayers == 0){
                return 1;
            } else {
                return 2;
            }
        }catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}