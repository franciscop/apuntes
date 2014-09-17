# Low voltage switchgear











## Circuit breaker

### Main arcing

There's a mechanism to avoid the suffering of the main contacts from the arc. They stay together with the appropriate pressure to allow for independent closure while the transition is happening.

### Releases

The primary releases are inside while the secondary ones are outside. There are several ways to classify them:

- Primary
- Secondary

By the use of the use
- Direct
- Indirect: current transformer


We need to protect the system against these phenomena by the primary or direct releases:

- **Overload** $~k \cdot I_n, k \in (2, 3)$ : it yields problems with **overheating**. This produces loses with the order of $P = I^2 \cdot R \cdot t$. This cannot be avoided but can be reduced when it's too high.

- **Shortcircuit** $k \cdot I_n, k > 10$: the problem comes from the magnetic trip unit. The current that produces the shortcircuit is also the one that triggers the disconnection.

### Secondary releases

There can be an over-current release, which is handled by the inner coild. It operates under an open circuit base.


The other one is the under-voltage. It operates under a normally closed circuit base.


| Frequency    | Sequence for the tests | Condition after the sequence            | Specification                                       |
|--------------|------------------------| ----------------------------------------|-----------------------------------------------------|
| One use      | O-t-CO                 | Not required to carry its rated current | kA                                                  |
| Service use  | O-t-CO-t-CO            | Required to carry its rated current     | $I_s = K \cdot I_u \\\\ K \in (0.25, 0.5, 0.75, 1)$ |


### Time-current curve

To find out the release point, you test the circuit-breaker while meassuring the current that is flowing. When it's triggered, you register the current. After many tests you can find the parameters.

Magnetic releases can be joined to obtain a multi-release curve.

We must assure that the components triggers when there's a load, but also that it doesn't trigger when there's no load.

There are some currents characterized for 1 hour:

- **Tripping current** $I_{t}$: the minimum value that the producer assures the release will always trigger. Its value is $I_t = 1.3 \cdot I_r$

- **Non tripping current** $I_{nt}$: the maximum value that the producer assures the release will never trigger. Its value is $I_t = 1.05 \cdot I_r$


### Miniature circuit-breaker

They are completely standard circuit breakers installed at home and small services.

| Type | Normal use | Lower limit    | Upper limit    |
|------|------------|----------------|----------------|
| B    | Long lines | $3  \cdot I_n$ | $5  \cdot I_n$ |
| C    | Light load | $5  \cdot I_n$ | $10 \cdot I_n$ |
| D    | Heavy load | $10 \cdot I_n$ | $20 \cdot I_n$ |
| Time | -          | $t  \geq 0.1s$ | $t  \leq 0.1s$ |



## Fuses

To find out whether they are burnt out or not, many fuses include a visual element to it. Also, you can test them for continuity.

All the phases should be equipped with fuses.

It's common to combine a fuse with a circuit breaker. While the later can also act as the former, it's normally cheaper if the breaker only handles the overload and the fuse handles shortcircuit.



There are three variables to consider:

- **Operating time $t_F$**: interval between the beginning of a current and the instant of final arc extintion.

- **Melting time $t_f$**: interval between the beginning of the current and when the arc is initiated.

- **Arcing time $t_a$**: interval of time between the beginning of the arc and the arc extintion.


## Contactor

A contactor is an electrically controlled switch used for switching a power circuit, similar to a relay except with higher current ratings. It is controlled by a circuit which has a much lower power level than the switched circuit.

It doesn't provide any kind of protection.




















