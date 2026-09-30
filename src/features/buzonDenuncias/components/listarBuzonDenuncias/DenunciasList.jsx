import { DataStateHandler } from '../../../../components/common/ui/is-loading/DataStateHandler';
import DenunciaCard from './DenunciaCard';
import EmptyState from './EmptyState';

export default function DenunciasList({ denuncias = [], isLoading, isError, error, onRetry, onVerDetalle, onAtender }) {

    return (
        <DataStateHandler
            isLoading={isLoading}
            isError={isError}
            error={error}
            loadingMessage="Cargando denuncias..."
            errorMessage="No se pudieron cargar las denuncias."
            onRetry={onRetry}
        >
            {denuncias.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-5">
                    {denuncias.map((denuncia) => (
                        <DenunciaCard
                            key={denuncia.idDenuncias}
                            denuncia={denuncia}
                            onVerDetalle={onVerDetalle}
                            onAtender={onAtender}
                        />
                    ))}
                </div>
            )}
        </DataStateHandler>
    );
}