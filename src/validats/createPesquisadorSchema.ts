import { z } from "zod";

export const createPesquisadorSchema = z.object({
    nome: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(1, "Nome é obrigatório")
    ),
    
    email: z.preprocess(
        (val) => (val === undefined ? "".toLowerCase() : val),
        z.string().email("Formato de email inválido")
    ),
    senha: z.preprocess(
        (val) => (val === undefined ? "": val),
         z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
        ),
    especialidade: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(1, "Especialidade é obrigatória")
    ),

    titulacao: z.enum(["Graduação", "Especialização", "Mestrado", "Doutorado"], {
        message: "Titulação inválida. Escolha entre: Graduação, Especialização, Mestrado ou Doutorado"
    }),

    matricula: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(1, "Matrícula é obrigatória")
    ),

    linhaPesquisa: z.preprocess(
        (val) => (val === "" || val === null ? undefined : val),
        z.string().optional()
    ),

    dataNascimento: z.coerce.date({
         message: "Data de nascimento inválida ou não preenchida" 
    }).refine((data) => {
        if (isNaN(data.getTime())) return false; // Garante que a data é válida
        const hoje = new Date();
        const idade = hoje.getFullYear() - data.getFullYear();
        const mes = hoje.getMonth() - data.getMonth();
        const dia = hoje.getDate() - data.getDate();
        
        let idadeFinal = idade;
        if (mes < 0 || (mes === 0 && dia < 0)) {
            idadeFinal--;
        }
        return idadeFinal >= 18;
    }, "O pesquisador deve ter no mínimo 18 anos completos"),
});