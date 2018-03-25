int trigger = 2;
int led = 4;
int speaker = 7;
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
    Serial.println("1");
  }else if(trigger_val == LOW){
    trigger_down = 0;    
  }
  // put your main code here, to run repeatedly:
  
}
