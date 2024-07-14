// Clase Grupo
public class Grupo {
    private String IDGrupo;
    private String nombreGrupo;
    private List<Usuario> miembros;

    public Grupo(String IDGrupo, String nombreGrupo, List<Usuario> miembros) {
        this.IDGrupo = IDGrupo;
        this.nombreGrupo = nombreGrupo;
        this.miembros = miembros;
    }

    public void añadirMiembro(Usuario usuario) {
        miembros.add(usuario);
    }

    public void eliminarMiembro(Usuario usuario) {
        miembros.remove(usuario);
    }

    // Getters y setters
    public String getIDGrupo() {
        return IDGrupo;
    }

    public void setIDGrupo(String IDGrupo) {
        this.IDGrupo = IDGrupo;
    }

    public String getNombreGrupo() {
        return nombreGrupo;
    }

    public void setNombreGrupo(String nombreGrupo) {
        this.nombreGrupo = nombreGrupo;
    }

    public List<Usuario> getMiembros() {
        return miembros;
    }

    public void setMiembros(List<Usuario> miembros) {
        this.miembros = miembros;
    }
}
