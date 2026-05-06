# 1. ¿Por qué es importante que el mensaje de error del login sea genérico ("Credenciales incorrectas") en lugar de especificar si fue el email o la contraseña lo que falló?

Porque no hay que darle información a posibles usuarios maliciosos que intenten averiguar la contraseña o el email de otros usuarios

# 2. ¿Qué información NO deberías guardar nunca en el payload del JWT? (pista: piensa en qué información es visible para cualquiera que tenga el token)

Nunca deberías de guardar la constraseña ya que esta podría ser revelada

# 3. ¿Por qué usamos bcrypt.compare en lugar de hashear la contraseña y compararla con ===?

Porque bcrypt aplica un SALT_ROUNDS para encriptar la contraseña. Entonces si la comparamos con === siempre sera false.
