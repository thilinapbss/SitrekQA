# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - button "settings" [ref=e8] [cursor=pointer]:
      - img [ref=e10]
  - main [ref=e13]:
    - generic [ref=e14]:
      - generic [ref=e15]:
        - heading "SITREK" [level=3] [ref=e16]
        - paragraph [ref=e17]: Secure Logistics
      - img "Dashboard illustration" [ref=e18]
    - generic [ref=e20]:
      - heading "Sign In" [level=5] [ref=e22]
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Enter Username
          - generic [ref=e27]:
            - textbox "Enter Username" [ref=e28]: thilina
            - group:
              - generic: Enter Username
        - generic [ref=e30]:
          - generic [ref=e31]: Enter Password
          - generic [ref=e32]:
            - textbox "Enter Password" [active] [ref=e33]:
              - /placeholder: 6+ characters
              - text: admin@1234
            - button [ref=e35] [cursor=pointer]:
              - img [ref=e36]
            - group:
              - generic: Enter Password
        - button "Sign in" [ref=e38] [cursor=pointer]: Sign in
      - generic [ref=e39]:
        - generic [ref=e40]:
          - text: 2026 © Perfect Business Solution Services PVT Ltd.
          - text: All rights reserved.
        - generic [ref=e41]: Version 0.3.0
```