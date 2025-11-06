// Arquivo: api/index.js (Versão MODERNA)

import express from 'express'; // <--- Mudança: 'import' em vez de 'require'
const app = express();

// Middleware para entender JSON
app.use(express.json());

// --- Lógica de Negócio Pura ---
function validarRegrasDaSenha(senha) {
    const erros = [];
    if (!senha) {
        return { valida: false, erros: ["A senha não pode estar vazia."] };
    }
    if (senha.length < 8) {
        erros.push("A senha precisa ter no mínimo 8 caracteres");
    }
    if (!/[A-Z]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 letra maiúscula");
    }
    if (!/[0-9]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 número");
    }
    if (!/[!@#$%^&*]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 caractere especial (ex: !@#$%^&*)");
    }

    if (erros.length > 0) {
        return { valida: false, erros: erros };
    } else {
        return { valida: true };
    }
}

// --- O Endpoint da API ---
app.post('/api/validar-senha', (req, res) => {
    const { senha } = req.body;
    const resultado = validarRegrasDaSenha(senha);

    if (resultado.valida) {
        return res.status(200).json(resultado);
    } else {
        return res.status(400).json(resultado);
    }
});

// Exporta o 'app' para o Vite usar
export default app; // <--- Mudança: 'export default' em vez de 'module.exports'