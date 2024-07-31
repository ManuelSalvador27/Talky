// Clase Mensaje
public class Mensaje {
    private String IDMensaje;
    private String contenido;
    private Date timestamp;
    private String IDRemitente;
    private String IDDestinatario;

    public Mensaje(String IDMensaje, String contenido, Date timestamp, String IDRemitente, String IDDestinatario) {
        this.IDMensaje = IDMensaje;
        this.contenido = contenido;
        this.timestamp = timestamp;
        this.IDRemitente = IDRemitente;
        this.IDDestinatario = IDDestinatario;
    }

    public void enviarMensaje() {
        // Implementar lógica de envío de mensaje
    }

    public void eliminarMensaje() {
        // Implementar lógica de eliminación de mensaje
    }

    // Getters y setters
    public String getIDMensaje() {
        return IDMensaje;
    }

    public void setIDMensaje(String IDMensaje) {
        this.IDMensaje = IDMensaje;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getIDRemitente() {
        return IDRemitente;
    }

    public void setIDRemitente(String IDRemitente) {
        this.IDRemitente = IDRemitente;
    }

    public String getIDDestinatario() {
        return IDDestinatario;
    }

    public void setIDDestinatario(String IDDestinatario) {
        this.IDDestinatario = IDDestinatario;
    }
}