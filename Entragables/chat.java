// Clase Chat
public class Chat {
    private String IDChat;
    private List<Usuario> participantes;
    private List<Mensaje> mensajes;

    public Chat(String IDChat, List<Usuario> participantes, List<Mensaje> mensajes) {
        this.IDChat = IDChat;
        this.participantes = participantes;
        this.mensajes = mensajes;
    }

    public void agregarParticipante(Usuario usuario) {
        participantes.add(usuario);
    }

    public void eliminarParticipante(Usuario usuario) {
        participantes.remove(usuario);
    }

    public List<Mensaje> obtenerMensajes() {
        return mensajes;
    }

    // Getters y setters
    public String getIDChat() {
        return IDChat;
    }

    public void setIDChat(String IDChat) {
        this.IDChat = IDChat;
    }

    public List<Usuario> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<Usuario> participantes) {
        this.participantes = participantes;
    }

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }
}