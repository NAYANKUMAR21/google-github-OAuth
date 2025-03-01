# Google Github Architecture



+--------+                           +----------------+  
|  User  |                           | Google/GitHub  |  
+--------+                           |  Authorization |  
     |                               |    Server      |  
     | Initiate Login                +----------------+  
     |------------------------------>|  
     |                               |  
     | Redirect to Auth Page         |  
     |<------------------------------|  
     |                               |  
     | Authenticate & Consent        |  
     |------------------------------>|  
     |                               |  
     | Authorization Code            |  
     |<------------------------------|  
     |                               |  
     | Exchange Code for Token       |  
     |------------------------------>|  
     |                               |  
     | Access Token                  |  
     |<------------------------------|  
     |                               |  
     | Call API with Token           +----------------+  
     |------------------------------>| Google/GitHub |  
     |                               |  Resource     |  
     | User Data (JSON)              |    Server     |  
     |<------------------------------+----------------+  


