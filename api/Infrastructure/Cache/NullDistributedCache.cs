using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Infrastructure
{
    /// <summary>
    /// 空实现的分布式缓存服务，用于开发阶段
    /// </summary>
    public class NullDistributedCache : IDistributedCache
    {
        public byte[] Get(string key) =>new byte[] { };

        public Task<byte[]> GetAsync(string key, CancellationToken token = default(CancellationToken))
        {
            Task<byte[]> task = Task.Run(() => new byte[] { });
            return task;
        }

        public void Refresh(string key)
        {
            // Method intentionally left empty.
        }

        public Task RefreshAsync(string key, CancellationToken token = default(CancellationToken))
        {
            return new Task(() => { });
        }

        public void Remove(string key)
        {
            // Method intentionally left empty.
        }

        public Task RemoveAsync(string key, CancellationToken token = default(CancellationToken))
        {
            return new Task(() => { });
        }

        public void Set(string key, byte[] value, DistributedCacheEntryOptions options)
        {
            // Method intentionally left empty.
        }

        public Task SetAsync(string key, byte[] value, DistributedCacheEntryOptions options, CancellationToken token = default(CancellationToken))
        {
            return new Task(() => { });
        }
    }
}
