// Clase Usuario
public class Usuario {
    private String IDUsuario;
    private String nombreUsuario;
    private String email;
    private String contraseña;
    private String avatar;

    public Usuario(String IDUsuario, String nombreUsuario, String email, String contraseña, String avatar) {
        this.IDUsuario = IDUsuario;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.contraseña = contraseña;
        this.avatar = avatar;
    }

    public void login() {
        // Implementar lógica de inicio de sesión
    }

    public void logout() {
        // Implementar lógica de cierre de sesión
    }

    public void actualizarPerfil() {
        // Implementar lógica de actualización de perfil
    }

    public void recuperarContraseña() {
        // Implementar lógica de recuperación de contraseña
    }

    // Getters y setters
    public String getIDUsuario() {
        return IDUsuario;
    }

    public void setIDUsuario(String IDUsuario) {
        this.IDUsuario = IDUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
