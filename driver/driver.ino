int trigger = 2;
int led = 4;
int speaker = 9;
int trigger_down = 0;
void setup() {
  Serial.begin(9600);
  pinMode(trigger, INPUT);
  pinMode(led, OUTPUT);
  pinMode(speaker, OUTPUT);
}

void loop() {
  int trigger_val = digitalRead(trigger);
  if ( trigger_val == HIGH && !trigger_down){
    trigger_down = 1;
    Serial.print("1");
  }else if(trigger_val == LOW){
    trigger_down = 0;    
  }

  if(Serial.available()){
    digitalWrite(led, HIGH);
    char x = (char)Serial.read();
    if(x == '1'){
      tone(speaker,1000);
    }
    delay(1000);
    digitalWrite(led, LOW);
    noTone(speaker);
  }
}
