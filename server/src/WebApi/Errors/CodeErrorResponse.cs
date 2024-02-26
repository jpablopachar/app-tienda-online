namespace WebApi.Errors
{
    public class CodeErrorResponse
    {
        public CodeErrorResponse(int statusCode, string? message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageStatusCode(statusCode)!;
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        private string? GetDefaultMessageStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "El request enviado tiene errores",
                401 => "No tienes autorización para este recurso",
                404 => "No se encontró el recurso solicitado",
                500 => "Se produjo un error en el servidor",
                _ => null
            };
        }
    }
}