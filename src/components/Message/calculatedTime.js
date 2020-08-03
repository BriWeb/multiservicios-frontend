const calculatedTime = (writedAt) => {

    const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

    writedAt = {
        ...writedAt,
        day : days[writedAt.day],
        month: months[writedAt.month]
    }

    return writedAt;
}

export default calculatedTime;