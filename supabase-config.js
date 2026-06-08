// Configuración de Supabase
const SUPABASE_URL = 'https://qpwuuoaimyknuflcowpz.supabase.co';
const SUPABASE_KEY = 'qpwuuoaimyknuflcowpz';

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para guardar usuario en Supabase
async function guardarUsuarioEnSupabase(usuario) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .upsert([usuario], { onConflict: 'usuario' });

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return false;
    }

    console.log('Usuario guardado en Supabase:', data);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

// Función para obtener usuario desde Supabase
async function obtenerUsuarioDeSupabase(usuario) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('usuario', usuario)
      .single();

    if (error) {
      console.error('Error al obtener de Supabase:', error);
      return null;
    }

    console.log('Usuario obtenido de Supabase:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Función para obtener todos los usuarios
async function obtenerTodosLosUsuariosDeSupabase() {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }

    console.log('Usuarios obtenidos:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
